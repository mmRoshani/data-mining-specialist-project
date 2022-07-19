# pyspark

## Installation 

    $ pyspark --conf "spark.mongodb.read.connection.uri=mongodb://root:root_password@localhost:28018/DK.comments?authSource=admin&readPreference=primaryPreferred&appname=MongoDB%20Compass&directConnection=true&ssl=false" \
                --conf "spark.mongodb.write.connection.uri=mongodb://root:root_password@localhost:28018/DK.comments_result?authSource=admin&readPreference=primaryPreferred&appname=MongoDB%20Compass&directConnection=true&ssl=false" \
                --packages org.mongodb.spark:mongo-spark-connector:10.0.2
    
install spark NLP

- https://nlp.johnsnowlabs.com/

        $ pyspark --packages com.johnsnowlabs.nlp:spark-nlp_2.12:3.4.4

