# DemoAppforTwitter

# Installation Guide

This is a simple .NET appication, reads 10 tweets from usertimeline by accessing tokens

## This application consists of:

*   Sample pages twitterapp/Home


## Deployment instructions

*   
*   Create new folder SalesForceDemo in  'C:\inetpub\wwwroot\' path
*   Get code from repository and save it to SalesForceDemo folder (Created in previous step)
*   Open Internet Information Service (IIS ) Manager
*   Go to Sites and right click on it
*   Select Add Web Site -e.g TwitterApp
*   Add Site name and physical path ( e.g C:\inetpub\wwwroot\SalesForceDemo\DempAppforTwitter
*   Add Host name- e.g TwitterApp
*   Click on Ok button and verify TwitterApp is created in Sites
*   Go to Application Pools and verify TwitterApp pool is created
*   Right click on apppool anc verify settings
*   It must have .NET Framework Version as v4.0
*   Now add the same host name in host file 
*   
*   [127.0.0.1    Twitterapp]



## Output

*   http://twitterapp/home


I would love to hear your [feedback]
