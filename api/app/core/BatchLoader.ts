import consola from "consola";
import { ConnectionWrapper } from "../utils/db";

export const DEFAULT_BATCH_SIZE = 100;
export const DEFAULT_FLUSH_INTERVAL = 10;
export const DEFAULT_MAX_RETRIES = 2;

export interface Option {
    /**
     * The maxRetries determine how many times the insert statement will be executed
     * when it failed.
     * 
     * Default: 2
     */
    maxRetries?: number;
    /**
     * The flushInterval is used to control how often do it perform a batch insert
     * if the batch size is not reached. If it is less than 0, will not flush intermittently.
     * 
     * Default: 10 second.
     */
    flushInterval?: number;
    /**
     * The batchSize is used to control how many records will be insert once.
     * 
     * Default: 100
     */
    batchSize?: number;
}

export class BatchLoader {
    private buf: any[];
    private logger = consola.withTag('batch-loader');
    private batchSize: number;
    private maxRetries: number;

    constructor(
        // TODO: replace with connection promisify.
        readonly conn: ConnectionWrapper,
        readonly sql: string,
        readonly option: Option = {}
    ) {
        this.buf = [];

        this.maxRetries = option.maxRetries || DEFAULT_MAX_RETRIES;
        if (this.maxRetries < 0) {
            this.maxRetries = 0;
        }

        this.batchSize = option.batchSize || DEFAULT_BATCH_SIZE;
        if (this.batchSize < 0) {
            throw new Error('Batch size must greater than 0.');
        }

        const flushInterval = option.flushInterval || DEFAULT_FLUSH_INTERVAL;
        if (flushInterval > 0) {
            setInterval(async () => {
                if (this.buf.length > 0) {
                    this.logger.debug(`Batch loader flush after ${flushInterval} seconds interval.`);
                    await this.flush();
                }
            }, flushInterval * 1000);
        }
    }

    async insert(values: any[]) {
        this.buf.push(values);

        if (this.buf.length >= this.batchSize) {
            await this.flush();
        }
    }

    async flush(): Promise<void> {
        if (this.buf.length < 0) {
            return;
        }

        // Notice: During batch insertion phase as follow, data may still be written to buffer. 
        // If we clean up the buffer array after the batch insertion is completed, that will result in data loss.
        // So we can copy it to a temporary memory and clear the buffer so that it can continue to store new data.
        const records = [[...this.buf]];
        this.buf = [];

        for (let retries = 0; retries <= this.maxRetries; retries++) {
            try {
                await this.conn.query(this.sql, records);
                return;
            } catch (err) {
                if (retries < this.maxRetries) {
                    this.logger.error(`Failed to batch load ${records.length} records, retries: ${retries + 1}/${this.maxRetries}.`);
                    continue
                } else {
                    this.logger.error(`Failed to batch load ${records.length} records, they will be lost: `, err);
                }
            }
        }
    }
}
