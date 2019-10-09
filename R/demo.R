#' Demo
#' 
#' Run a demo of marker.
#' 
#' @export
marker_demo <- function(){
  shiny::shinyAppFile(
    system.file(
      paste0("app/app.R"), 
      package = 'marker', 
      mustWork = TRUE
    ), 
    options = list(display.mode = "showcase")
  )
}