var globalContacts = []
var globalOptions = []


 function createCell(text, row){
   var cell= $('<td></td>');
   cell.text(text)
   row.append(cell)
 }


 function updateContactRow(option,row, key){
  //  console.log(row);

   createCell(option.fullname,row)
   createCell(option.phone,row)
   createCell(option.fax,row)
   createCell(option.address,row)
   createCell(option.website,row)
   createCell(option.email,row)
   return row

 }
 function updateOptionRow(option,row, key){

    createCell(option.fullname,row)
    createCell(option.start,row)
    createCell(option.end,row)
    createCell(option.price,row)
    createCell(option.rate,row)
    createCell(option.days,row)
    createCell(option.bedrooms,row)
    createCell(option.bathrooms,row)
    // createCell(option.short,row)

    var cell = $('<td></td>');
    cell.html("<a href='#"+key+"'>Contact Information</a>")
    row.append(cell)
    return row
 }

 function updateContactsTable(contacts){
   console.log(contacts);
    var table = $("#contactsTable")
    contacts.forEach(function(uv){
        console.log(uv);
        //Each option should have own row
        var row = $('<tr></tr>');
        updateContactRow(uv,row, null)
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

 $(document).ready(function() {


    getCollection('options').then(function(options){
         globalOptions = options
         updateOptionsTable(globalOptions)
         $('#optionsTable').DataTable();
         $('#contacts').css('display','block')


    }).then(function(){
      getCollection('contact').then(function(contacts){
             globalContacts = contacts
             updateContactsTable(contacts)
             $('#info').css('display','block')
      })
    })
  } )
