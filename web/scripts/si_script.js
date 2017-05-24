/**Responsible for adding content of the tables and map.*/
var globalContacts = []
var globalOptions = []


 function createCell(text, row){
   var cell= $('<td></td>');
   cell.html(text)
   row.append(cell)
   return cell
 }


 function updateContactRow(option,row, key){
  // console.log(key);
  var cell = createCell(option.fullname,row)
  try {
    var link = $('<span id="'+key +'"></span>' );
    cell.append(link)
  } catch (e) {
    console.log(e);
  } finally {

  }




   createCell(option.phone,row)
   createCell(option.fax,row)
  //  createCell(option.address,row)
   createCell(option.email,row)
   var web = $('<a href='+option.website+' target= "_blank"><i class="fa fa-external-link" aria-hidden="true"></i></a>');
   createCell(web,row)

   return row

 }
 function updateOptionRow(option,row, key){

    createCell(option.fullname,row)
    let dates = option.start + " - " + option.end
    // createCell(option.start,row)
    // createCell(option.end,row)
    createCell(dates,row)
    createCell("$"+option.price,row)
    createCell("$"+option.rate,row)
    createCell(option.days,row)
    let options =  option.bedrooms + " / " + option.bathrooms
    // createCell(option.bedrooms,row)
    // createCell(option.bathrooms,row)
    createCell(options,row)
    // createCell(option.short,row)

    var cell = $('<td></td>');
    cell.html("<a href='#"+key+"'><i class='fa fa-link' aria-hidden='true'></i></a>")
    row.append(cell)
    return row
 }

 function updateContactsTable(contacts){
  //  console.log(contacts);
    var table = $("#contactsTable")
    contacts.forEach(function(uv){
        // console.log(uv);
        //Each option should have own row
        var row = $('<tr></tr>');
        updateContactRow(uv,row,uv.key)
        table.append(row)

    });
 }

 /**Rendering Table*/
 function updateOptionsTable(options){
   var table = $("#optionsTable")
   //Options
   options.forEach(function(uv){

    for (var key in uv){
      if(uv.hasOwnProperty(key)){
          if(key === "key"){ //Skip it

          }
          else{
            //Each option should have own row
            var row = $('<tr></tr>');
            updateOptionRow(uv[key],row, uv.key)
            table.append(row)
          }
      }
    }
 });
 }

//Here is how it starts
 $(document).ready(function() {


    getCollection('options').then(function(options){
         globalOptions = options
         updateOptionsTable(globalOptions)
        // $('#optionsTable').DataTable();
         $('#contacts').css('display','block')


    }).then(function(){
      getCollection('contact').then(function(contacts){
             globalContacts = contacts
             updateContactsTable(contacts)
             $('#info').css('display','block')
      })
    })
  } )
