#' Marker
#' 
#' Highlight text in shiny.
#' 
#' @details Initialise a marker object to point at a CSS 
#' \code{selector} then use methods to \code{mark} or 
#' \code{unmark} text.
#' 
#' @examples 
#' library(shiny)
#' 
#' # load a paragraph
#' data(lorem, package = "marker")
#' 
#' ui <- fluidPage(
#'   useMarker(),
#'   p(id = "text-to-mark", lorem),
#'   textInput("mark", "Text to mark")
#' )
#' 
#' server <- function(input, output){
#' 
#'   my_marker <- marker$new("#text-to-mark")
#' 
#'   observeEvent(input$mark, {
#'     my_marker$
#'       unmark()$ # unmark previously marked text
#'       mark(input$mark) # mark what is searched
#'   })
#' 
#' }
#' 
#' if(interactive())
#'   shinyApp(ui, server)
#' 
#' @import assertthat
#' 
#' @export
marker <- R6::R6Class(
  "Marker",
  public = list(

#' @details Initialise a marker with \code{new} method.
#' 
#' @param selector A valid CSS selector, e.g.: \code{#id}, 
#' \code{.class}, or \code{div}.
#' @param session A valid shiny session, if \code{NULL} (default)
#' then the function attempts to get the current reacive domain.
#' @param name A name, useful to distinguish between markers. If
#' \code{NULL} a random name is generated.
#' 
#' @examples 
#' library(shiny)
#' 
#' # load a paragraph
#' data(lorem, package = "marker")
#' 
#' ui <- fluidPage(
#'   useMarker(),
#'   p(id = "text-to-mark", lorem),
#'   textInput("mark", "Text to mark")
#' )
#' 
#' server <- function(input, output){
#' 
#'   my_marker <- marker$new("#text-to-mark")
#' 
#'   observeEvent(input$mark, {
#'     my_marker$
#'       unmark()$ # unmark previously marked text
#'       mark(input$mark) # mark what is searched
#'   })
#' 
#' }
#' 
#' if(interactive())
#'   shinyApp(ui, server)
    initialize = function(selector, session = NULL, name = NULL){
      assert_that(has_it(selector))
      
      # store private variables
      private$set_name(name)
      private$set_session(session)

      # initialise
      private$.session$sendCustomMessage(
        "marker-init",
        list(
          name = private$.name,
          selector = selector
        )
      )

      return(self)
    },

#' @details A method to highlight custom search terms.
#' 
#' @param keywords A vector or character string of keywords
#' to highlight.
#' @param ... Options passed to JavaScript, see the 
#' \href{https://markjs.io/}{official documentation} under "mark"
#' for the full list.
#' @param send_marked Whether to send the number of highlighted 
#' keywords to the R server. These can then be accessed with 
#' the \code{get_marked} method. Note that this overwrites the 
#' \code{done} options passed to the three dot construct.
#' @param delay Delay in milliseconds before highlighting text.
#' 
#' @examples 
#' library(shiny)
#' 
#' # load a paragraph
#' data(lorem, package = "marker")
#' 
#' ui <- fluidPage(
#'   useMarker(),
#'   p(id = "text-to-mark", lorem),
#'   actionButton("mark", "Mark lorem")
#' )
#' 
#' server <- function(input, output){
#' 
#'   my_marker <- marker$new("#text-to-mark")
#' 
#'   observeEvent(input$mark, {
#'     my_marker$
#'       unmark()$ # unmark previously marked text
#'       mark("lorem") # mark what is searched
#'   })
#' 
#' }
#' 
#' if(interactive())
#'  shinyApp(ui, server)

    mark = function(keywords, ..., send_marked = FALSE, delay = 0){
      assert_that(has_it(keywords))

      private$.session$sendCustomMessage(
        "marker-mark",
        list(
          name = private$.name,
          keywords = keywords,
          marked = send_marked,
          delay = delay,
          options = list(...)
        )
      )

      return(self)
    },

#' @details A method to remove highlights created by mark.js.
#' 
#' @param ... Options passed to JavaScript, see the 
#' \href{https://markjs.io/}{official documentation} under "unmark"
#' for the full list.

    unmark = function(...){
      private$.session$sendCustomMessage(
        "marker-unmark",
        list(
          name = private$.name,
          options = list(...)
        )
      )

      return(self)
    },

#' @details A method to highlight custom regular expressions.
#' 
#' @param regex A valid \href{https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions}{regular expression}.
#' @param ... Options passed to JavaScript, see the 
#' \href{https://markjs.io/}{official documentation} under "markRegExp"
#' for the full list.
#' @param send_marked Whether to send the number of highlighted 
#' keywords to the R server. These can then be accessed with 
#' the \code{get_marked} method. Note that this overwrites the 
#' \code{done} options passed to the three dot construct.
#' @param delay Delay in milliseconds before highlighting text.
#' 
#' @examples 
#' library(shiny)
#' 
#' # load a paragraph
#' data(lorem, package = "marker")
#' 
#' ui <- fluidPage(
#'   useMarker(),
#'   p(id = "text-to-mark", lorem),
#'   actionButton("mark", "Mark")
#' )
#' 
#' server <- function(input, output){
#' 
#'   my_marker <- marker$new("#text-to-mark")
#' 
#'   observeEvent(input$mark, {
#'     my_marker$
#'       unmark()$ # unmark previously marked text
#'       mark_regex('[a-z]') # mark what is searched
#'   })
#' 
#' }
#' 
#' if(interactive())
#'   shinyApp(ui, server)

    mark_regex = function(regex, ..., send_marked = FALSE, delay = 0){
      assert_that(has_it(regex))

      private$.session$sendCustomMessage(
        "marker-mark-regex",
        list(
          name = private$.name,
          regex = regex,
          marked = send_marked,
          delay = delay,
          options = list(...)
        )
      )
    },

#' @details A method to mark ranges with a start position and length. They will be applied to text nodes in the specified context.
#' 
#' @param ranges A list of ranges \code{list(list(start = 1, length = 3), list(start = 5, length = 3))}.
#' @param ... Options passed to JavaScript, see the 
#' \href{https://markjs.io/}{official documentation} under "markRanges"
#' for the full list.
#' @param send_marked Whether to send the number of highlighted 
#' keywords to the R server. These can then be accessed with 
#' the \code{get_marked} method. Note that this overwrites the 
#' \code{done} options passed to the three dot construct.
#' 
#' @examples 
#' library(shiny)
#' 
#' # load a paragraph
#' data(lorem, package = "marker")
#' 
#' ui <- fluidPage(
#'   useMarker(),
#'   p(id = "text-to-mark", lorem),
#'   actionButton("mark", "Mark")
#' )
#' 
#' server <- function(input, output){
#' 
#'   my_marker <- marker$new("#text-to-mark")
#' 
#'   observeEvent(input$mark, {
#'     my_marker$
#'       unmark()$ # unmark previously marked text
#'       mark_ranges(list(list(start = 5, length = 10))) # mark what is searched
#'   })
#' 
#' }
#' 
#' if(interactive())
#'   shinyApp(ui, server)

    mark_ranges = function(ranges, ..., send_marked = FALSE){
      assert_that(has_it(ranges))
      ranges <- as.list(ranges)

      private$.session$sendCustomMessage(
        "marker-mark-ranges",
        list(
          name = private$.name,
          ranges = ranges,
          marked = send_marked,
          options = list(...)
        )
      )
    },

#' @details A method to returned the number of keywords marked.
#' 
#' This requires setting \code{send_marked} to \code{TRUE} in
#' the various \code{mark*} functions.
#' 
#' @examples 
#' library(shiny)
#' 
#' # load a paragraph
#' data(lorem, package = "marker")
#' 
#' ui <- fluidPage(
#'   useMarker(),
#'   p(id = "text-to-mark", lorem),
#'   actionButton("mark", "Mark"),
#'   verbatimTextOutput("marked")
#' )
#' 
#' server <- function(input, output){
#' 
#'   my_marker <- marker$new("#text-to-mark")
#' 
#'   observeEvent(input$mark, {
#'     my_marker$
#'       unmark()$
#'       mark_regex('[a-z]', send_marked = TRUE)
#'   })
#' 
#'   output$marked <- renderPrint({
#'      my_marker$get_marked() 
#'   })
#' 
#' }
#' 
#' if(interactive())
#'   shinyApp(ui, server)

    get_marked = function(){
      input <- paste0(private$.name, "_marked")
      private$.session$input[[input]]
    }
  ),
  active = list(

#' @field session Get or set the session, if NULL returns the previously 
#' assigned reactive context.

    session = function(session){
      if(!missing(session)){
        private$check_session(session)
        private$.session <- session
      } else
        private$.session
    },

#' @field name Set the name to identify the marker internally. This is read-only.

    name = function(name){
      assert_that(!missing(name), "name is read only.")
      if(!missing(name)){
        private$.session <- name
      } 
    }
  ),
  private = list(
		set_session = function(session = NULL){
      if(is.null(session))
        session <- shiny::getDefaultReactiveDomain()
      private$check_session(session)
			private$.session <- session
		},
    check_session = function(session){
      assert_that(is_valid_session(session))
    },
    set_name = function(name){
      if(is.null(name))
        name <- private$random_name()
      private$.name <- name
    },
    random_name = function(){
      letters <- tolower(LETTERS)
      letters <- sample(letters) 
      numbers <- sample(1:20)
        
      paste0(letters, numbers, collapse = "")
    },
    .session = NULL,
    .name = NULL
  )
)