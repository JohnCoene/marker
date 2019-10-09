check_session <- function(x){
  if(is.null(x))
    stop("Invalid session, run this function inside your Shiny server.", call. = FALSE)
}