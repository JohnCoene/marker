#' Dependencies
#' 
#' Include marker dependencies at the top of your shiny UI.
#' 
#' @export 
use_marker <- function(){
  shiny::singleton(
    shiny::tags$head(
			shiny::tags$script("window.marker = [];"),
      shiny::tags$script(
        src = "marker-assets/js/mark.min.js"
      ),
      shiny::tags$script(
        src = "marker-assets/js/custom.js"
      )
    )
  )
}