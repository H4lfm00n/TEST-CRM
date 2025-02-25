function sendOnboardingEmails() {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Form Responses 1"); // Change if needed
    var data = sheet.getDataRange().getValues();
    var lastRow = data.length;
    var emailColumn = 2; // Change according to your column index for emails
    var categoryColumn = 3; // Change according to your column index for categories
    var sentColumn=4;  
    
    var discordLink = "https://discord.gg/YOUR_INVITE_LINK";
    var redLabWebsite = "https://YOUR_REDLAB_WEBSITE.com";
    
    for (var i = 1; i < lastRow; i++) {
        var email = data[i][emailColumn];
        var category = data[i][categoryColumn];
        var sentStatus= data[i][sentColumn]; 

        if( email && !sentStatus){ 

          var subject = "Welcome to RED Lab - Next Steps!";
        var body = "Hello,\n\nWelcome to RED Lab! Here’s what you need to know based on your selection:\n\n";

        if (category === "Project Research Assistant") {
            body += "🔹 You have been added as a **Project Research Assistant**. You'll be working on structured research projects.\n";
        } else if (category === "RED Explorers") {
            body += "🔹 You are a **RED Explorer**, meaning you can contribute to others' projects or build your own ideas for fun!\n";
        } else {
            body += "🔹 You have signed up to attend our **workshops and networking events**!\n";
        }

        body += `\nJoin our Discord server here: ${discordLink}`;
        body += `\nVisit our website: ${redLabWebsite}`;
        body += `\n\nLooking forward to seeing you in the lab!\n\nBest,\nRED Lab Team`;
        MailApp.sendEmail(email, subject, body);
        sheet.getRange(i+1, sentColumn+1).setValue("sent"); 
        }  
        
        
        
    }
}