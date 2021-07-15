#' Dependencies
#' 
#' Include marker dependencies at the top of your shiny UI.
#' 
#' @examples 
#' library(shiny)
#' 
#' ui <- fluidPage(
#'  useMarker()
#' )
#' 
#' @importFrom htmltools htmlDependency
#' 
#' @name deps
#' @export 
use_marker <- function(){
  .Deprecated("useMarker", "marker")
  useMarker()
}

#' @name deps
#' @export 
useMarker <- function(){
  htmlDependency(
    "marker",
    version = utils::packageVersion("marker"),
    package = "marker",
    src = "packer",
    script = "marker.js"
  )
}