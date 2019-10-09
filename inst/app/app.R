library(shiny)
library(marker)

data(lorem)

ui <- fluidPage(
  use_marker(),
  h2("Test app"),
  tags$head(
    tags$style(
      ".red{background-color:#FFB8C3;}
      .blue{background-color:#6ECFEA;}"
    )
  ),
  p(
    id = "text-to-mark",
    lorem
  ),
  textInput("text", "text to highlight in red"),
  textInput("text2", "text to highlight in blue"),
  p("Number of keywords matched in red"),
  verbatimTextOutput("marked")
)

server <- function(input, output){

  marker <- marker$new("#text-to-mark")
  
  observeEvent(input$text, {
    marker$
      mark(input$text, className = "red", send_marked = TRUE, send_not_matched = TRUE)
  })

  observeEvent(input$text2, {
    marker$
      mark(input$text2, className = "blue")
  })

  output$marked <- renderPrint({
    marker$get_marked()
  })

}

shinyApp(ui, server)