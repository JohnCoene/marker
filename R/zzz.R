.onLoad <- function(libname, pkgname) {
  shiny::addResourcePath(
    "marker-assets", system.file("assets", package = "marker")
  )

  shiny::registerInputHandler("markerParse", function(data, ...) {
    jsonlite::fromJSON(jsonlite::toJSON(data, auto_unbox = TRUE))
  }, force = TRUE)
}