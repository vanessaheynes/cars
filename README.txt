To run the Web API: dotnet run
- This calls a Python script that first adds the data into a sqlLite data base
I included this script so I could test the project on different sized datasets.
- Then, the data can be viewed from http://localhost:<port>/api/cars

To run the Angular page: ng serve --open 
- Unfortunately, I needed to hardcode my port number (for the Web API/same one above) 
in the app.component.ts file, so that might need to be edited before running the page. 
I tried to set an apiUrl through environments, but that didn't work. 
- I found that displaying all 1000+ cars' data made the bar graph hard to read,
so the page displays the average total speed for a company (based on all the models).
- The Web API needs to be running before entering ng serve...
