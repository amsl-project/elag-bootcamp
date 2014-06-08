---
title: "Installation"
---

# Images Overview

There are two images, namely

* elag2014_64 (for 64bit machines)
* elag2014_32 (for 32bit machines)

The computer name (not really needed) is <code-inline>elag</code-inline> and the the (only) user on these machines is:

* user name: elag
* password: elag

## VirtualBox Installation Instructions

### Manjaro/Arch

* Install VirtualBox with pacman
* Install and enable the kernel modules, as pointed out here: [https://wiki.archlinux.org/index.php/VirtualBox](https://wiki.archlinux.org/index.php/VirtualBox), especially point 1.2 und 1.3

### Ubuntu

Install VirtualBox with apt-get:

    $  sudo apt-get install virtualbox virtualbox-qt virtualbox-dkms virtualbox-guest-dkms

# PHP and ODBC
Most of the following instructions can be done with the help of your terminal and editor of choice. PHP has already been installed on the VM but to make it work with OntoWiki we need two additional packages:

    $ sudo apt-get install php5-odbc libapache2-mod-php5

The first package provides the required ODBC driver for PHP and the second one allows for the Apache2 to render PHP.

Now let's configure php. Therefore locate php.ini via <code-inline>updatedb</code-inline>.

<pre><code class='bash'>$ sudo updatedb
$ locate php.ini
$ [editor] /path/to/php.ini
</code></pre>

Now change the values as recommended:

<pre><code class='bash'>max_execution_time = 120
memory_limit = 512M
upload_max_filesize = 128M 
post_max_size = 256M
short_open_tag = On
</code></pre>

# Virtuoso
If you are using the virtual machine you can install it from the official repositories. During the installation you will be asked to enter a password for the DBA user. For the purpose of this workshop please use <code-inline>dba</code-inline> as password.

<pre><code>$ sudo apt-get install virtuoso-opensource</code></pre>  

You can now check if Virtuoso is running with: 
<pre><code>$ sudo service virtuoso-opensource-6.1 status</code></pre> 

Afterwards you can access the Virtuoso Conductor in your browser at [http://localhost:8890/](http://localhost:8890/).

## Configuration
Now locate the virtuoso.ini and open it with an editor. On Ubuntu it is located at <code-inline>/etc/virtuoso-opensource-6.1/virtuoso.ini</code-inline>.

<pre><code>$ sudo updatedb
$ locate virtuoso.ini
</code></pre> 

To give Virtuoso the permission to access the OntoWiki, we have to add the future OntoWiki directory to the <code-inline>DirsAllowed</code-inline> parameter.

<i class="fa fa-exclamation fa-fw"></i> On this VM choose <code-inline>/var/www/html/OntoWiki/</code-inline> and add it to the <code-inline>DirsAllowed</code-inline> parameter:

<pre><code class='apache'>DirsAllowed = ., /usr/share/virtuoso-opensource-6.1/vad/, /var/www/html/OntoWiki, /tmp</code></pre>

Now restart Virtuoso to let the changes take effect.
<pre><code>$ sudo service virtuoso-opensource-6.1 restart</code></pre> 


# OntoWiki and Apache

Now it is time to checkout the OntoWiki from the official repository:

<pre><code class='bash'>$ cd /var/www/html
$ sudo mkdir OntoWiki
$ sudo chown -R elag:elag OntoWiki
$ sudo apt-get install git
$ git clone https://github.com/AKSW/OntoWiki.git OntoWiki 
$ cd OntoWiki
$ git checkout --track -b deployment/erm-hd origin/deployment/erm-hd
$ make deploy
</code></pre>

OntoWiki uses a global config file <code-inline>config.ini.dist</code-inline> which is located in the root directory. To use it rename it to <code-inline>config.ini</code-inline>. You can now enable debugging in by uncommenting <code-inline>debug = true</code-inline> to get exeptions in case OntoWiki runs into an error.


## ODBC Configuration

By default, ODBC should be working out-of-the-box. To check if your ODBC connection is working correctly execute the ODBC test.

<a class="pure-button" id='odbctest-button'><i class="fa fa-play-circle-o button-icon"></i> Start ODBC test</a>

<div id='odbctest-output'></div>

If the test fails, click on the following button to see instructions.

<a class="pure-button" id='odbc-instructions-button'><i class="fa fa-book button-icon"></i> Show instructions</a>

<div id='odbc-instructions' class="hidden-div">

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

</div>

## Apache Configuration


Once Virtuoso, ODBC and PHP are running we can finally configure the Apache Webserver and OntoWiki. First, edit <code-inline>/etc/apache2/sites-enabled/000-default.conf</code-inline>

<pre><code class='xml'><Directory "/var/www/html">
Options Indexes FollowSymLinks
AllowOverride All 
&lt;/Directory>
</code></pre>

And don't forget to activate Apache's mod rewriting.
<pre><code class='bash'>$ sudo a2enmod rewrite</code></pre> 

Now Restart apache.
<pre><code class='bash'>$ sudo service apache2 restart</code></pre> 

Finally check [http://localhost/OntoWiki](http://localhost/OntoWiki) if OntoWiki is running correctly.


