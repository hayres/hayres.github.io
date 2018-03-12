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

Taking over the management of a code base that extensively uses pointers was a chance to learn what it was all about.   However, it was not until I got to the point where I had to write my own code the penny really dropped and I got to learn something.

The problem (opportunity)  I had was that I had to select preset variable depending on the contents of a variable provided by a query string.


{% highlight go linenos %}
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
		//the var query is created as a pointer to the 
		//complex variable selectActivitiesQueryDesc
		query := &selectActivitiesQueryDesc
		//the var orderBy is tested to see if it == "asc"
		if strings.ToLower(orderBy) == "asc" { 
			//if it does then we pointer is set to point to selectActivitiesQueryAs  
			query = &selectActivitiesQueryAsc
		} else {
		//this is belt and braces it is already selectActivitiesQueryDesc 
		//so i dont need to set it again but I have
			query = &selectActivitiesQueryDesc
		}
		the value of the pointer *query is passed to the method
		//this passes all of selectActivitiesQueryAsc or selectActivitiesQueryDesc so that
		//all of the following is available to the method  
		//ame: "select-activities-desc",
		//Query: `
		//select * from activity_log order by id DESC limit ?, ?
		rows, err := connection.connection.QueryRows(ctx, *query, page, number)
    }
}
{% endhighlight %}


Without using pointers I cannot easily switch between the two complex variables and nicely pass them to the method.

[A Tour of Go - Pointers - https://tour.golang.org/moretypes/1](https://tour.golang.org/moretypes/1){:target="_blank"}

        





