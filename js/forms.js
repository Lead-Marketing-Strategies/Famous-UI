(function ($, window, FamousUI) {
  FamousUI.forms = {
    country_list: ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"],
    us_state_list: ['Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming'],
    init: () => {
      $('select').each(function() {
        var select = $(this);
        if(!select.attr("multiple")){
        var color = select.data("color");
        var newId = Math.random().toString(36).substr(2, 9);
        var label = $("<label>").addClass("fui-select-label-wrapper").attr("for", newId);
        label.insertBefore(select);
        if(color){
          label.addClass("text-"+color);
        }
        var span = $("<span>");
        span.text(select.find("option:selected").text());
        label.append(span);
        label.append(select);
        $(this).attr("id", newId);

        if(select.hasClass("fui-input-us-states")){
          var item = $("<option>");
          item.text("Select a State");
          item.val("");
          select.append(item);
          FamousUI.forms.us_state_list.forEach(function(val, index){
            var item = $("<option>");
            item.text(val);
            item.val(val);
            select.append(item);
          });
        }

        if(select.hasClass("fui-input-country")){
          var item = $("<option>");
          item.text("Select a Country");
          item.val("");
          select.append(item);

          FamousUI.forms.country_list.forEach(function(val, index){
            var item = $("<option>");
            item.text(val);
            item.val(val);
            select.append(item);
          });


        }

        var selected = select.find("option:selected").text();
        if(!selected){
          select.find("option").first().attr("selected");
          selected = select.find("option:selected").text();
        }
        select.prev('span').text(selected);
      }
      });
      $('select').change(function() {
          $(this).prev('span').text(
            $(this).find(':selected').html()
          );
        });

        $.fn.FUIForm = function () {
          let target = $(this);

          let addErrors = (errors) => {
            let fui_errors = target.find(".fui-errors");
            if(fui_errors.length < 1){
              let fui_errors = $("<div>").addClass("fui-errors");
              target.prepend(fui_errors);
            }

            if(errors){
                for(error in errors){
                  var error = $("<div />").addClass("fui-alert danger").text(errors[error]);
                  fui_errors.append(error);
                  var field = fui_errors.find("[name='"+error+"']");
                  field.addClass("error-field");
                }
              }
            }

            let clearErrors = () => {
              target.find(".fui-errors").empty();
            }

          return {
            addErrors: addErrors,
            clearErrors: clearErrors
          }

        };

}
  };
  FamousUI.forms.init();
}(jQuery, window, FamousUI));
