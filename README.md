# Geo-Queer made by Allie Grey, Cody Bollinger, and Rasheeq Azad.

Inspiration:
Initially, we wanted to create a platform that showed users nearby businesses and locations that self-labeled as "LGBTQ+-Friendly" or "Transgender Friendly". We originally wanted to get this data from Google APIs, as Google Maps allows businesses to identify as LGBTQ+ friendly, which it then displays in its results. Unfortunately, as that tag is not accessible through publicly available Google APIs, we had to refine our idea. Hence Geo-Queer: a database-powered map entity that allows anyone to rank the level of safety any location has for the LGBTQ+ community.

What it does:
Geo-Queer allows users to search for and select places as they are identified in Google Maps. Geo-Queer then allows the user to submit whether they feel that place is "Safe" or "Unsafe" for the LGBTQ+ community. For instance, a user wishing to report on the "LGBT+ center in Durham" would enter that location and click on the "Safe" button that is offered under the map. Geo-Queer stores the tally of these inputs in its database, and will display this vote to future users who select the same location. Due to how the code is structured, any address available in Google Maps can be added to the database.

If you wish to test it, we have preloaded a few entries around Chapel Hill, including:

Cat’s Cradle, East Main Street, Carrboro, NC, USA
LGBTQ Center of Durham, Hunt Street, Durham, NC, USA
LGBT Center of Raleigh, West Hargett Street, Raleigh, NC, USA
Spotted Dog Restaurant & Bar, East Main Street, Carrboro, NC, USA
(All values associated with the above were randomized)

How we built it:
The frontend of Geo-Queer is a HTML/CSS/JS webpage that uses the Google Maps and Google Places APIs to present a searchable map. The page also implements the scoring interface. To load and update the scores, the web page communicates JSON documents via HTTP GET and POST requests with the backend server. The backend server runs on a Node.js/Express.js framework. In addition to serving the static content of the webpage, the server also interprets the additional requests made by the page into queries on a MongoDB Atlas database. In order to identify locations/businesses, both the frontend and backend communicate Google Maps place IDs, which are long textual identifiers used by Google APIs to identify locations. We also used Adobe Illustrator to create assets for the webpage.
