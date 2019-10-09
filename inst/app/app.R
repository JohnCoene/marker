library(shiny)
library(marker)

data(lorem)

ui <- fluidPage(
  use_marker(),
  tags$head(
    tags$style(
      ".red{background-color:#FFB8C3;}
      .blue{background-color:#6ECFEA;}"
    )
  ),
  h2("Marker"),
  br(),
  p("Dynamically highlight text by typing in the text boxes below."),
  br(),
  div(
    class = "container",
    div(
      class = "well",
      id = "text-to-mark",
      lorem
    ),
    fluidRow(
      column(6, textInput("text", "Keywords to highlight in red")),
      column(
        6, 
        textInput("text2", "Keywords to highlight in blue"),
        p("Number of keywords matched in blue"),
        verbatimTextOutput("marked")
      )
    )
  )
)

server <- function(input, output){

  marker <- marker$new("#text-to-mark")
  
  observeEvent(input$text, {
    marker$
      unmark(className = "red")$
      mark(input$text, className = "red", send_marked = TRUE, send_not_matched = TRUE)
  })

  observeEvent(input$text2, {
    marker$
      unmark(className = "blue")$
      mark(input$text2, className = "blue")
  })

  output$marked <- renderPrint({
    marker$get_marked()
  })

}

shinyApp(ui, server)