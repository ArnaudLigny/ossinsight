---
title: "OSS Database Analysis: 2021"
image: /img/gharchive-title-img.png
---


![](/img/gharchive-title-img.png)

## Datasets

We have collected a list of well-known open source projects in the field of database and big data, mainly including: TiDB, Elasticsearch, Clickhouse, Redis, etc. If the repo you care about is not on the list, you can submit a [pull request](https://github.com/hooopo/gharchive/blob/main/meta/repos/db_repos.yml) to improve it.

The full list of database repositories participating in statistics includes

 ```
 +-----------+----------------------------+
| id        | name                       |
+-----------+----------------------------+
| 507775    | elastic/elasticsearch      |
| 60246359  | clickhouse/clickhouse      |
| 17165658  | apache/spark               |
| 41986369  | pingcap/tidb               |
| 16563587  | cockroachdb/cockroach      |
| 6838921   | prometheus/prometheus      |
| 108110    | mongodb/mongo              |
| 166515022 | trinodb/trino              |
| 48833910  | tikv/tikv                  |
| 156018    | redis/redis                |
| 688366    | apache/lucene-solr         |
| 160985    | apache/hbase               |
| 5349565   | prestodb/presto            |
| 6934395   | facebook/rocksdb           |
| 6358188   | apache/druid               |
| 11008207  | vitessio/vitess            |
| 19961085  | apache/pinot               |
| 206444    | apache/hive                |
| 30753733  | percona/percona-server     |
| 105944401 | yugabyte/yugabyte-db       |
| 31006158  | apache/ignite              |
| 99919302  | apache/incubator-doris     |
| 50874442  | citusdata/citus            |
| 84240850  | timescale/timescaledb      |
| 28738447  | apache/kylin               |
| 44781140  | greenplum-db/gpdb          |
| 26521330  | alibaba/oceanbase          |
| 13124802  | influxdata/influxdb        |
| 146459443 | vesoft-inc/nebula          |
| 28449431  | scylladb/scylla            |
| 160990    | apache/hadoop              |
| 206417    | apache/couchdb             |
| 9342529   | crate/crate                |
| 19257422  | questdb/questdb            |
| 196353673 | taosdata/TDengine          |
| 172104891 | MaterializeInc/materialize |
| 402945349 | StarRocks/starrocks        |
| 11225014  | etcd-io/etcd               |
| 2649214   | arangodb/arangodb          |
| 41349039  | dgraph-io/dgraph           |
| 114187903 | apple/foundationdb         |
| 20587599  | apache/flink               |
| 19816070  | MariaDB/server             |
| 69400326  | confluentinc/ksql          |
+-----------+----------------------------+
```

## Top 10 repos by stars in 2021

```sql
  SELECT db.name as repo_name, count(*) as stars
    FROM github_events
         JOIN db_repos db ON db.id = github_events.repo_id
   WHERE event_year = 2021 
         AND type = 'WatchEvent' 
GROUP BY 1
ORDER BY 2 DESC
   LIMIT 10
```

<iframe  width="100%" height="350" scrolling="no"  src="https://staticsiteg.github.io/echarts/bar.html?x=[%22clickhouse/clickhouse%22,%20%22redis/redis%22,%20%22prometheus/prometheus%22,%20%22elastic/elasticsearch%22,%20%22questdb/questdb%22,%20%22etcd-io/etcd%22,%20%22pingcap/tidb%22,%20%22apache/spark%22,%20%22cockroachdb/cockroach%22,%20%22facebook/rocksdb%22]&data=[7628,%206313,%205898,%205669,%205505,%204524,%203967,%203833,%203311,%203190]&theme=vintage">
</iframe>

## Top 10 repos by PR in 2021

```sql
  SELECT db_repos.name AS repo_name,
         COUNT(*) AS num
    FROM github_events 
         JOIN db_repos ON db_repos.id = github_events.repo_id
   WHERE type = 'PullRequestEvent' AND event_year = 2021 AND action = 'opened'
GROUP BY 1
ORDER BY 2 DESC
   LIMIT 10
```

<iframe  width="100%" height="350" scrolling="no"  src="https://staticsiteg.github.io/echarts/bar.html?x=[%22elastic/elasticsearch%22,%20%22clickhouse/clickhouse%22,%20%22cockroachdb/cockroach%22,%20%22pingcap/tidb%22,%20%22apache/spark%22,%20%22taosdata/TDengine%22,%20%22apache/flink%22,%20%22MaterializeInc/materialize%22,%20%22trinodb/trino%22,%20%22arangodb/arangodb%22]&data=[10433,%209689,%207204,%204777,%203703,%203542,%203338,%202883,%202334,%201663]&theme=vintage">
</iframe>

## Top Developers for OSS Databases

```sql
  SELECT actor_login, count(*) as pr_count
    FROM github_events
         JOIN db_repos db ON db.id = github_events.repo_id
   WHERE event_year = 2021 
         AND type = 'PullRequestEvent' 
         AND action = 'opened' 
         AND actor_login not like '%bot%'
GROUP BY 1
ORDER BY 2 DESC
   LIMIT 20
```

| Avatar |actor_login        | bar               | pr_count
|-------| ------------------ | ----------------- | --------
|![](https://avatars.githubusercontent.com/u/40268737?s=40&v=4) |[jrodewig](https://github.com/jrodewig)           | ▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇ | 1586
|![](https://avatars.githubusercontent.com/u/825729?s=40&v=4) |[sangshuduo](https://github.com/sangshuduo)          | ▇▇▇▇▇▇▇▇          | 703
|![](https://avatars.githubusercontent.com/u/1423118?v=4&s=40) |[jsteemann](https://github.com/jsteemann)          | ▇▇▇▇▇▇▇           | 652
|![](https://avatars.githubusercontent.com/u/6490959?v=4&s=40) |[original-brownbear](https://github.com/original-brownbear) | ▇▇▇▇▇▇▇           | 615
| |[alexey-milovidov](https://github.com/alexey-milovidov)   | ▇▇▇▇▇▇            | 542
|![](https://avatars.githubusercontent.com/u/5135385?v=4&s=40) |[yuzefovich](https://github.com/yuzefovich)        | ▇▇▇▇▇             | 471
| |[azat](https://github.com/azat)               | ▇▇▇▇▇             | 455
|![](https://avatars.githubusercontent.com/u/882976?v=4&s=40) |[benesch](https://github.com/benesch)            | ▇▇▇▇▇             | 422
|![](https://avatars.githubusercontent.com/u/144328?v=4&s=40) |[findepi](https://github.com/findepi)           | ▇▇▇▇              | 378
|![](https://avatars.githubusercontent.com/u/3646147?v=4&s=40) |[otan](https://github.com/otan)               | ▇▇▇▇              | 375
|![](https://avatars.githubusercontent.com/u/4357155?v=4&s=40) |[benwtrent](https://github.com/benwtrent)          | ▇▇▇▇              | 345
|![](https://avatars.githubusercontent.com/u/5058284?v=4&s=40) |[DaveCTurner](https://github.com/DaveCTurner)        | ▇▇▇               | 323
|![](https://avatars.githubusercontent.com/u/2755881?v=4&s=40) |[danxmoran](https://github.com/danxmoran)         | ▇▇▇               | 317
|![](https://avatars.githubusercontent.com/u/38700?v=4&s=40) |[mfussenegger](https://github.com/mfussenegger)       | ▇▇▇               | 309
|![](https://avatars.githubusercontent.com/u/215970?v=4&s=40) |[nik9000](https://github.com/nik9000)            | ▇▇▇               | 298
|![](https://avatars.githubusercontent.com/u/1320573?v=4&s=40) |[rafiss](https://github.com/rafiss)             | ▇▇▇               | 295
|![](https://avatars.githubusercontent.com/u/12521043?v=4&s=40) |[JimGalasyn](https://github.com/JimGalasyn)         | ▇▇▇               | 295
|![](https://avatars.githubusercontent.com/u/5076964?v=4&s=40) |[tbg](https://github.com/tbg)                | ▇▇▇               | 288
| |alesapin           | ▇▇▇               | 288
|![](https://avatars.githubusercontent.com/u/22777892?v=4&s=40) |[danhermann](https://github.com/danhermann)         | ▇▇▇               | 283


## OSS Database repos with the highest growth YoY

```sql
  SELECT db.name,
         sum(event_year = 2020) AS stars2020,
         sum(event_year = 2021) AS stars2021,
         round(sum(event_year = 2021) / sum(event_year = 2020), 3) AS yoy
    FROM github_events
         JOIN db_repos as db on db.id = github_events.repo_id
   WHERE type = 'WatchEvent' AND event_year in (2021, 2020)
GROUP BY db.name
  HAVING stars2020 > 0 and yoy > 1
ORDER BY yoy DESC
   LIMIT 20
```

```
+------------------------+-----------+-----------+-------+
| name                   | stars2021 | stars2020 | yoy   |
+------------------------+-----------+-----------+-------+
| questdb/questdb        | 5505      | 2006      | 2.744 |
| apache/incubator-doris | 1713      | 760       | 2.254 |
| trinodb/trino          | 2620      | 1227      | 2.135 |
| apache/pinot           | 895       | 461       | 1.941 |
| citusdata/citus        | 1114      | 627       | 1.777 |
| clickhouse/clickhouse  | 7628      | 5139      | 1.484 |
| crate/crate            | 422       | 300       | 1.407 |
| cockroachdb/cockroach  | 3311      | 2425      | 1.365 |
| apple/foundationdb     | 869       | 712       | 1.221 |
| facebook/rocksdb       | 3190      | 3116      | 1.024 |
| dgraph-io/dgraph       | 2814      | 2801      | 1.005 |
+------------------------+-----------+-----------+-------+

```

## OSS Database repos with lowest growth YoY

```sql
  SELECT db.name,
         sum(event_year = 2020) AS stars2020,
         sum(event_year = 2021) AS stars2021,
         round(sum(event_year = 2021) / sum(event_year = 2020), 3) AS yoy
    FROM github_events
         JOIN db_repos as db on db.id = github_events.repo_id
   WHERE type = 'WatchEvent' AND event_year in (2021, 2020)
GROUP BY db.name
  HAVING stars2020 > 0 and yoy < 1
ORDER BY yoy ASC
   LIMIT 10
```

```
+----------------------------+-----------+-----------+-------+
| name                       | stars2020 | stars2021 | yoy   |
+----------------------------+-----------+-----------+-------+
| vesoft-inc/nebula          | 4634      | 1577      | 0.340 |
| MaterializeInc/materialize | 2152      | 1227      | 0.570 |
| apache/ignite              | 740       | 500       | 0.676 |
| arangodb/arangodb          | 1860      | 1305      | 0.702 |
| percona/percona-server     | 135       | 95        | 0.704 |
| apache/druid               | 1585      | 1122      | 0.708 |
| elastic/elasticsearch      | 7852      | 5669      | 0.722 |
| apache/kylin               | 477       | 354       | 0.742 |
| taosdata/TDengine          | 4058      | 3011      | 0.742 |
| confluentinc/ksql          | 954       | 727       | 0.762 |
+----------------------------+-----------+-----------+-------+
```

## Top Language for OSS Databases

```sql
  SELECT language, count(*)
    FROM github_events
         JOIN db_repos db ON db.id = github_events.repo_id
   WHERE event_year = 2021 AND type = 'PullRequestEvent' AND action = 'opened'
GROUP BY 2
ORDER BY 3 DESC
   LIMIT 5
```


|    Logo     | language | bar                                 | count(*)
| -------- | -------- | ----------------------------------- | --------
|![](/img/lang/java.png) | Java     | ▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇ | 24137
|![](/img/lang/go.png) | Go       | ▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇            | 16630
|![](/img/lang/cpp.png) | C++      | ▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇            | 16607
|![](/img/lang/c.png) | C        | ▇▇▇▇▇▇▇▇▇▇▇                         | 7605
|![](/img/lang/rust.png) | Rust     | ▇▇▇▇▇▇                              | 4366

