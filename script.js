var $currentDay = $("#currentDay");
var $scheduleArea = $(".schedule");
var $timeBlocks = $("time-block");
var currentDate = moment().format("dddd, MMMM Do");
var currentHour = moment().format("H");
var toDOItems = [];

function initializeSchedule(){
    $timeBlocks.each(function(){
        var $thisBlock = $(this);
        var thisBlockHr = parseInt($thisBlock.attr("data-hour"));
        var toDoObj = { 
            hour: thisBlockHr, 
            Text: "",
        }
        toDOItems.push(toDoObj);
    });
    localStorage.setItem("toDo", JSON.stringify(toDOItems));
}
//changes the color depending on time
function setUpTimeBlocks(){
    $timeBlocks.each(function(){
      var $thisBlock = $(this);
      var thisBlockHr = parseInt($thisBlock.attr("data-hour"));

      if (thisBlockHr == currentHour) {
        $thisBlock.addClass("present").removeClass("past future");
      }
      if (thisBlockHr < currentHour) {
        $thisBlock.addClass("past").removeClass("present future");
      }
      if (thisBlockHr > currentHour) {
        $thisBlock.addClass("future").removeClass("past present");
      }
    });
}

function renderSchedule(){
  
    toDoItems = localStorage.getItem("toDo");
    toDoItems = JSON.parse(toDoItems);

    for (var i = 0; i < toDoItems.length; i++){
      var itemHour = toDoItems[i].hour;
      var itemText = toDoItems[i].text; 
     
      $("[data-hour=" + itemHour + "]").children("textarea").val(itemText);
    }
  
    console.log(toDoItems);
  }
  
  function saveHandler(){
    var $thisBlock = $(this).parent();
  
    var hourToUpdate = $(this).parent().attr("data-hour");
    var itemToAdd = (($(this).parent()).children("textarea")).val();
  
    for (var j = 0; j < toDoItems.length; j++){
      if (toDoItems[j].hour == hourToUpdate){
        toDoItems[j].text = itemToAdd;
      }
    }
    localStorage.setItem("toDo", JSON.stringify(toDoItems));
    renderSchedule();
  }

  $(document).ready(function(){
  
    setUpTimeBlocks();

    if(!localStorage.getItem("toDo")){
      initializeSchedule();
    } 
    $currentDay.text(currentDate);
    renderSchedule();

    $scheduleArea.on("click", "button", saveHandler);
    
  });