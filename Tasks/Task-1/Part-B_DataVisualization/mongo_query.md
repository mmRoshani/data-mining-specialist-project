### less than 3 query

`SK.comments.find()`

##### less than 3 

        {
            "rate" : {
                $lte : 3
            }
        }

##### equal to 3

        {
            "rate":3
        }

##### bigger than 3

        {
            "rate" : {
                $gte : 4
            }
        }