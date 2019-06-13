(function ($, window, FamousUI) {
  FamousUI.calendar = {
    daysOfWeek: [ 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ],
    init: () => {
      $(".fui-calendar").each(function(){
        var input = $(this);
        var calendar_container = $("<div>").addClass("fui-calendar-container");
        calendar_container.insertBefore(input);
        calendar_container.append(input);
        if(input.hasClass("fui-calendar-dropdown")){
          calendar_container.addClass("fui-calendar-container-dropdown");
          input.attr("readonly", "readonly");
          input.on("focus", function(){
            calendar_container.addClass("fui-calendar-container-dropdown-open");
            calendar_container.find(".fui-calendar-type").find(":input").first().focus();
          });

        }
        if(input.hasClass("fui-calendar-fancy")){
          var fancyCal = FamousUI.calendar.createFancyCalendar(input);
          calendar_container.append(fancyCal);

          calendar_container.on("click", ".fui-calendar-nav-prev", function(){
            FamousUI.calendar.prevMonth(input);
          });

          calendar_container.on("click", ".fui-calendar-nav-next", function(){
            FamousUI.calendar.nextMonth(input);
          });

          calendar_container.on("click", ".fui-calendar-day", function(){
            var day = $(this).data("day");
            var d = input.data("date");
            var m = d.getMonth();
            var y = d.getFullYear();
            var newDate = new Date(y, m, day)
            input.data("selected", newDate);

            var newSelected = $(this);
            $(".fui-calendar-day").not(newSelected).removeClass("fui-calendar-day-selected");
            newSelected.addClass("fui-calendar-day-selected");

            if(calendar_container.hasClass("fui-calendar-container-dropdown")){
              calendar_container.find(".fui-calendar").val(FamousUI.calendar.months[m] +" "+day+", "+ y);
              calendar_container.removeClass("fui-calendar-container-dropdown-open");
            }
          });

        } else {
          calendar_container.append(FamousUI.calendar.createStandardDate(input));
          calendar_container.on("change", ".fui-calendar-type :input", function(){
            var isValid = true;
            calendar_container.find(".fui-calendar-type :input").each(function(){
              if(!$(this).val()){ isValid = false; }
            });
            if(isValid){
              var month = calendar_container.find(".fui-calendar-month").val();
              var day = calendar_container.find(".fui-calendar-day").val();
              var year = calendar_container.find(".fui-calendar-year").val();
              calendar_container.find(".fui-calendar").val(month+" "+day+", "+year);
              calendar_container.removeClass("fui-calendar-container-dropdown-open");
            } else {
              calendar_container.find(".fui-calendar").val("");
            }
          });
        }
      });

      $("html,body").click(function(event){
        var $target = $(event.target);
            if(!$target.parents().is(".fui-calendar-container") && !$target.is(".fui-calendar-container")){
                $(".fui-calendar-container.fui-calendar-container-dropdown").removeClass("fui-calendar-container-dropdown-open");
            }

      });
    },
    createFancyCalendar: (calendar) => {
      var container = calendar.closest(".fui-calendar-container");
      var d = new Date();
      var m = d.getMonth();
      var y = d.getFullYear();
      calendar.data("date", d);

      var fancyCalendar = FamousUI.calendar.display(calendar);

    return fancyCalendar;

  },
  nextMonth: (calendar) => {
    var current_date = calendar.data("date");
    var month = current_date.getMonth();
    var year = current_date.getFullYear();
    var day = current_date.getDate();
    month++;
    calendar.data("date", new Date(year, month, day));
    FamousUI.calendar.update(calendar);
  },
  prevMonth: (calendar) => {
    var current_date = calendar.data("date");
    var month = current_date.getMonth();
    var year = current_date.getFullYear();
    var day = current_date.getDate();
    month--;
    calendar.data("date", new Date(year, month--, day));
    var fancyCalendar = FamousUI.calendar.update(calendar);
  },
  display: (calendar) => {
    var d = calendar.data("date");
    var m = d.getMonth();
    var y = d.getFullYear();
    var firstDayOfCurrentMonth = new Date(y, m, 1).getDay();
    var lastDateOfCurrentMonth = new Date(y, m+1, 0).getDate();

    var fancy = $("<div>").addClass("fui-calendar-type fui-calendar-type-fancy");
    var header = $("<div>").addClass("fui-calendar-header");
    var prev = $("<div>")
    .addClass("fui-calendar-nav fui-calendar-nav-prev")
    .html('<i class="fa fa-arrow-left"></i>');

    var next = $("<div>")
    .addClass("fui-calendar-nav fui-calendar-nav-next")
    .html('<i class="fa fa-arrow-right"></i>');

    var current = $("<div>").addClass("fui-calendar-current");
    var days = $("<div>").addClass("fui-calendar-days");

    header.append(prev);
    header.append(current);
    header.append(next);
    fancy.append(header);
    fancy.append(days);

    current.html(FamousUI.calendar.months[m] +" "+ y);
    var html = FamousUI.calendar.getDays(calendar);
    days.html(html)
    return fancy;
  },
  update: (calendar) => {
    var d = calendar.data("date");
    var m = d.getMonth();
    var y = d.getFullYear();
    var html = FamousUI.calendar.getDays(calendar);
    calendar.closest(".fui-calendar-container").find(".fui-calendar-days").html(html);
    calendar.closest(".fui-calendar-container").find(".fui-calendar-current").html(FamousUI.calendar.months[m] +" "+ y);
  },
  getDays: (calendar) => {
    var selected = calendar.data("selected");
    var d = calendar.data("date");
    var m = d.getMonth();
    var y = d.getFullYear();
    var firstDayOfCurrentMonth = new Date(y, m, 1).getDay();
    var lastDateOfCurrentMonth = new Date(y, m+1, 0).getDate();

    var table = $("<table>");
    var tableHead = $("<thead>");
    var weekRow = $("<tr>");
    for(var x=0;x<7;x++) {
      var weekDay = $("<th>").text(FamousUI.calendar.daysOfWeek[x]);
      weekRow.append(weekDay);
    }
    tableHead.append(weekRow);
    table.append(tableHead);

    var tableBody = $("<tbody>");
    var day = 1;
    var daysRow = $("<tr>");
    for (var i = 0; i <= 42; i++) {
      var weekDay = $("<td>");
      daysRow.append(weekDay);
      if(i>=firstDayOfCurrentMonth){
        var dayNum = $("<p>").addClass("fui-calendar-day");

        var todayDate = new Date();
        var todayMonth = todayDate.getMonth();
        var todayYear = todayDate.getFullYear();
        var todayDay = todayDate.getDate();


        if((day==todayDay)&&(m==todayMonth)&&(y==todayYear)){
          dayNum.addClass("fui-calendar-day-today");
          dayNum.text(day).data("day", day);
          weekDay.append(dayNum);
        }
        else{
          dayNum.text(day).data("day", day);
          weekDay.append(dayNum);
        }

        if(selected){
          var selMonth = selected.getMonth();
          var selYear = selected.getFullYear();
          var selDay = selected.getDate();
          if(m == selMonth
            && y == selYear
          && day == selDay){
            dayNum.addClass("fui-calendar-day-selected");
          }
        }

        day++;
      }
      if(i%7==0 && !(day > lastDateOfCurrentMonth)){
        tableBody.append(daysRow);
        var daysRow = $("<tr>");
      } else if (day > lastDateOfCurrentMonth) {
        tableBody.append(daysRow);
        break;
      }
    }

    table.append(tableBody);
    return table;
  },
  createStandardDate: (calendar) => {
    var standard = $("<div>").addClass("fui-calendar-type fui-calendar-standard");
    var row = FamousUI.calendar.createRow();

    var monthCol = FamousUI.calendar.createCol();
    var monthGroup = FamousUI.calendar.createGroup();
    var monthSelect = FamousUI.calendar.createSelect();
    monthSelect.addClass("fui-calendar-month");
    var monthOpts = JSON.parse(JSON.stringify(FamousUI.calendar.months));
    monthOpts.unshift("Month");
    var monthOptions = FamousUI.calendar.createOptions(monthOpts);

    monthSelect.append(monthOptions);
    monthGroup.append(monthSelect);
    monthCol.append(monthGroup);

    row.append(monthCol);

    var monthDays = [];
    monthDays.push("Day");
    for(var i=1;i<=31;i++){
      monthDays.push(i);
    }

    var dayCol = FamousUI.calendar.createCol();
    var dayGroup = FamousUI.calendar.createGroup();
    var daySelect = FamousUI.calendar.createSelect();
    daySelect.addClass("fui-calendar-day");
    var dayOptions = FamousUI.calendar.createOptions(monthDays);

    daySelect.append(dayOptions);
    dayGroup.append(daySelect);
    dayCol.append(dayGroup);

    row.append(dayCol);

    var monthYears = [];
    monthYears.push("Year");
    for(var i=2019;i>=1960;i--){
      monthYears.push(i);
    }

    var yearCol = FamousUI.calendar.createCol();
    var yearGroup = FamousUI.calendar.createGroup();
    var yearSelect = FamousUI.calendar.createSelect();
    yearSelect.addClass("fui-calendar-year");
    var yearOptions = FamousUI.calendar.createOptions(monthYears);

    yearSelect.append(yearOptions);
    yearGroup.append(yearSelect);
    yearCol.append(yearGroup);

    row.append(yearCol);
    standard.append(row);

    return standard;

  },
  createStandardTime: (calendar) => {
    //var label = FamousUI.calendar.createLabel();
    var row = FamousUI.calendar.createRow();

    var hourCol = FamousUI.calendar.createCol();
    var hourGroup = FamousUI.calendar.createGroup();
    var hourSelect = FamousUI.calendar.createSelect();
    var hourOptions = FamousUI.calendar.createOptions({
      "": "Hour"
    });

    hourSelect.append(hourOptions);
    hourGroup.append(hourSelect);
    hourCol.append(hourGroup);

    row.append(hourCol);

    var minuteCol = FamousUI.calendar.createCol();
    var minuteGroup = FamousUI.calendar.createGroup();
    var minuteSelect = FamousUI.calendar.createSelect();
    var minuteOptions = FamousUI.calendar.createOptions({
      "": "Minute"
    });

    minuteSelect.append(minuteOptions);
    minuteGroup.append(minuteSelect);
    minuteCol.append(minuteGroup);

    row.append(minuteCol);

    var periodCol = FamousUI.calendar.createCol();
    var periodGroup = FamousUI.calendar.createGroup();
    var periodSelect = FamousUI.calendar.createSelect();
    var periodOptions = FamousUI.calendar.createOptions({
      "am": "AM",
      "pm": "PM"
    });

    periodSelect.append(periodOptions);
    periodGroup.append(periodSelect);
    periodCol.append(periodGroup);

    row.append(periodCol);

    return row;

  },
  createLabel: (title) => {
    return $("<label>").addClass("mb-0").text(title);
  },
  createRow: () => {
    return $("<div>").addClass("row");
  },
  createCol: () => {
    return $("<div>").addClass("col-12 col-md-4");
  },
  createGroup: () => {
    return $("<div>").addClass("group pb-0");
  },
  createSelect: () => {
    return $("<select>").addClass("input");
  },
  createOptions: (opts) => {
    var options = [];
    opts.forEach(function(val, index){
      var item = $("<option>");
      if(val == "Month" || val == "Day" || val == "Year"){
        item.val("");
      } else {
        item.val(val);
      }
      item.text(val);
      options.push(item);
    });
    return options;
  }
};
FamousUI.calendar.init();
}(jQuery, window, FamousUI));
