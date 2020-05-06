start ng username. Martins\_c

api hosted heroku link------

[
# https://tutor-app2.herokuapp.com/Api/v1/
](https://tutor-app2.herokuapp.com/Api/v1/)

A tutor is made admin from my mongodb cloud server by setting the tutors **admin status** to true

it is set to false by default

**LOGIN AS ADMIN(also a tutor) with the credentials**

ENDPOINTS= **/tutors/login**

**req method= POST**

**requestbody (json) =**

{

&quot;password&quot;:&quot;wale1234&quot;,

&quot;userName&quot;:&quot;martins1234&quot;

}

copy your token provided (without the quotes ) after login

and paste on the header tab of postman as shown in the pics below

Tick the

to give you **acces** s to the APIserver

![](RackMultipart20200506-4-ps9ie0_html_3bc4d52b8e211f09.png)

**FIRST thing to do after admin login or sing up**

**(ADMIN PRIVILEDGE REQUIRED)**

**create category in the form(PRIMARY,JSS,SS)**

**ENDPOINT = Api/category**

METHOD= Post

**REQUEST BODY (json)** ===

{&quot;className&quot;:&quot;PRIMARTY&quot;} or {&quot;className&quot;:&quot;JSS&quot;} or {&quot;className&quot;:&quot;JSS&quot;}

(one at a time)

**GET LIST OF ALL CATEGORIES AND THEIR IDs**

**ENDPOINT = Api/category**

METHOD= Post

request body shoulbe empty

**CAN DELETE CATEGORY (ADMIN)**

**ENDPOINT =** category/:id (WHERE ID = ID OF CATEGORY, get from the above description)

METHOD= DEL

request body shoulbe empty

**(ADMIN PRIVILEDGE REQUIRED)**

create subject by category by category id

ENDPOINT = /category/id (where id = id of each category)

method =POST

request body =

{&quot;subjectsName&quot;:&quot;english&quot;}

**(ADMIN PRIVILEDGE REQUIRED)**

**DELETE SUBJECTS BY CATEGORY**

ENDPOINTS = /Subjects/:id (id is the subjects id)

REQ METHOD = delete

req body empty

**(ADMIN PRIVILEDGE REQUIRED)**

**RETRIEVE ALL TUTORS,,**

**ENDPOINTS = /tutors**

REQuest METHOD = get

**GET A TUTOR BY ID**

**ENDPOINTS = tutors/id**

REQuest METHOD = get

**(ADMIN PRIVILEDGE REQUIRED)**

**DEACTIVATE A TUTOR (BY ID);**

**ENDPOINTS = tutors/id (where id = id of user, get it from /users)**

REQuest METHOD = DEL

REQUEST BODY EMPTY

**ADMIN /USER CAN BOOK LESSONS**

ENDPOINTS= /lessons

request method= Post

REQUEST BODY EXAMPLE =

{&quot;description&quot;:&quot;i would like to learn english language&quot;}

**Admin can retrieve all lessons**

ENDPOINTS= /lessons

request method= Get

REQUEST BODY EXAMPLE can be empty

**Admin can get a lesson (by Id)**

ENDPOINTS= /lessons/id (id= lessons id gotten from list of all lessons)

request method= Get

REQUEST BODY EXAMPLE can be empty

**Admin can delete a lesson (by Id)**

endpoints = /lessons/:id (id = id of booked lessons)

request method= del

REQUEST BODY EXAMPLE can be empty

**Tutors can register**

**endpoints =** /tutors/register

request method= Post

REQUEST BODY example =

{ &quot;firstName&quot;:&quot;wale&quot;,

&quot;lastName&quot;:&quot;emeka&quot;,

&quot;password&quot;:&quot;wale1234&quot;,

&quot;userName&quot;:&quot;wale1234&quot;}

**Tutors can register to take a subject in a category**

(WHILE LOGGED IN AS A TUUTOR)

**ENDPOINTS = /tutor/addsubjects**

**REQUEST BODY ={&quot;subjects\_id&quot;:&quot;ID&quot;} ( where id is subject id in quotes**

**get from retrieve all subjects )**

**student can register**

**endpoints =** /register

request method= Post

REQUEST BODY example =

{ &quot;firstName&quot;:&quot;wale&quot;,

&quot;lastName&quot;:&quot;emeka&quot;,

&quot;password&quot;:&quot;wale1234&quot;,

&quot;userName&quot;:&quot;wale1234&quot;}

**retrieve all subject**

**endpoints =** /subjects

request method= Get

REQUEST BODY Empty

**retrieve a subject in a category (by Id)**

Endpoint = category/id (where id = category id gotten from categorylist= (Get: /category))

requets method = GET

request body empty

**search for subjects by subjectsName**

endpoints = /subjects/byname/:subjectsName

where subjectName = subjects to search for

request method = Get

request body empty

**to see all tutors taking a subject in a category**

endpoints = /subjects

request method = Get

request body empty
