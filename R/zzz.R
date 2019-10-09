.onLoad <- function(libname, pkgname) {
  shiny::addResourcePath(
    "marker-assets", system.file("assets", package = "marker")
  )
}