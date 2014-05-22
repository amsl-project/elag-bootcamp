---
title: "Installation"
---

# Apache HTTP Server
Stuff ...


# OntoWiki
Download OntoWiki and Stuff ...

# Virtuoso
Let's start with the Virtuoso Database. If you are using the virtual machine you can install it from the official repositories: 

You can now start the database server daemon with 
<pre><code>$ sudo service virtuoso-opensource-6.1 start</code></pre> 

Afterwards you can access the Virtuoso Conductor in your browser at <code-inline>http://localhost:8890/</code-inline> to assure Virtuoso is running.

## Configuration
The central configuration file is located at <code-inline>/etc/virtuoso-opensource-6.1/virtuoso.ini</code-inline>. In that file add your OntoWiki directory to the <code-inline>DirsAllowed</code-inline> parameter:

<pre><code class='apache'>DirsAllowed = ., /usr/share/virtuoso-opensource-6.1/vad/, /path/to/OntoWiki/</code></pre>

Now restart Virtuoso to let the changes take effect.
<pre><code>$ sudo service virtuoso-opensource-6.1 restart</code></pre> 

# PHP and ODBC
<pre><code>$ sudo apt-get install php5 php5-odbc libapache2-mod-php5</code></pre>

## Configuration
To make ODBC work with Virtuoso, two config files have to be edited. Add following lines to <code-inline>/etc/odbc.ini</code-inline> (create if not existent): 

<pre><code>[ODBC Data Sources]
VOS = Virtuoso

[VOS]
Driver = virtuoso-odbc
Description = Virtuoso Open-Source Edition
Address = localhost:1111
</code></pre>

Then edit <code-inline>/etc/odbcinst.ini</code-inline> and add the following lines:

<pre><code>[virtuoso-odbc]
Driver = /usr/lib/virtodbc.so   
</code></pre>

### ODBC Connection Test

To check if your ODBC connection is working correctly execute the ODBC test.

<a class="pure-button" id='odbctest-button'>Start ODBC test</a>

<div id='odbctest-output'></div>

