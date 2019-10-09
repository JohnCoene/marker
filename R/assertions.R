is_valid_session <- function(x) {
  !is.null(x)
}

on_failure(is_valid_session) <- function(call, env) {
  paste0(
    "Invalid `", 
    crayon::red(deparse(call$x)), 
    "`. ",
    "Make sure you run this function inside your Shiny server."
  )
}

has_it <- function(x) {
  !missing(x)
}

on_failure(has_it) <- function(call, env) {
  paste0(
    "Must pass `", crayon::red(deparse(call$x)), "` ."
  )
}