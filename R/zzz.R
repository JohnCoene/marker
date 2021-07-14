.onLoad <- function(libname, pkgname) {
  shiny::registerInputHandler("markerParse", function(data, ...) {
    jsonlite::fromJSON(jsonlite::toJSON(data, auto_unbox = TRUE))
  }, force = TRUE)
}