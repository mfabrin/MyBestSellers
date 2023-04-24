
# MyBestSellers - Digital library

The Books API provides information about book reviews and The New York Times Best Sellers lists. MyBestSellers is a WebApplication that can show you each list, based on a date that you can specify. If you like a book you can save it, rank it, and add some notes.
### MyBestSellers.Application
Contains services needed to retrieves data from database and expose them to WebApp and a class that register all services for dependency injection

### MyBestSellers.Common
Contains utility classes to register appsettings.json settings via dependency injection 

## MyBestSellers.Domain
Project domain, where database collections are defined

## MyBestSellers.Infrastructure
Contains the service that make REST calls to NY Times and the utility classes to make queries on database

## MyBestSellers.WebApp
The startup project: contains, in the ClientApp folder, the React application. 
"src" folder has some sub-folders:
- assets → contains styles of the app
- components → contains generic components
- helpers → contains global context and utilities
- views → contains main components (the pages of the app)


[Documentation](https://docs.google.com/document/d/1qIguqPaVFa8e87m96mzDuF_hMD1U1YjrNFKfECpfdMU/edit?usp=sharing)