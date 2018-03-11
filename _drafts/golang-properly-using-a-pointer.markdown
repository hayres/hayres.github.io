---
layout: post
title:  "Golang -  Properly Using a Pointer"
date:   2018-03-11 12:20:30
categories: blog software engineering golang
author: Henry Ayres
thumbnail: ""
---
 
# Golang - Properly using pointers

It is no secret that my background is 20 years of web scripting using ASP, PHP, Perl, Javascript and others.
So moving into software development using golang was going to be a learning curve in some areas.  

I knew about pointers from C and C++ and other compiled 3gl. But I never really understood or used them.

Taking over the management of a code bas that extensively uses pointers was a chance to learn what it was all about.   However, it was not until i got to the point where i had to write my own code the penny really dropped and I got to learn something.

The problem i had was that I had to select preset variable depending on the contents of a variable in a query string.


```go
var (
	selectActivitiesQueryDesc = namedQuery{
		Name: "select-activities-desc",
		Query: `
	select * from activity_log order by id DESC limit ?, ? 
	`,
	}
	selectActivitiesQueryAsc = namedQuery{
		Name: "select-activities-asc",
		Query: `
	select * from activity_log order by id ASC limit ?, ? 
	`,
	}
)

func (connection *CentralDBConnection) GetActivities(orderBy string, page int, number int) ([]ActivityLog, error) {

	fetch := func(ctx context.Context) (interface{}, time.Duration, error) {
		query := &selectActivitiesQueryDesc
		if strings.ToLower(orderBy) == "asc" {
			query = &selectActivitiesQueryAsc
		} else {
			query = &selectActivitiesQueryDesc
		}
		rows, err := connection.connection.QueryRows(ctx, *query, page, number)
    }
}
```



        





