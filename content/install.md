---
title: "Installation"
---

# Images Overview

* There are two images, namely
    * elag2014_64 (for 64bit machines)
    * elag2014_32 (for 32bit machines)
* the computer name (not really needed) is elag
* The (only) user on these machines is
    * user name: elag
    * password: elag

## VirtualBox Installation Instructions

### Manjaro/Arch

* Install VirtualBox with pacman
* Install and enable the kernel modules, as pointed out here: [https://wiki.archlinux.org/index.php/VirtualBox](https://wiki.archlinux.org/index.php/VirtualBox), especially point 1.2 und 1.3

### Ubuntu

Install VirtualBox with apt-get:

<pre><code>$  sudo apt-get install virtualbox virtualbox-qt virtualbox-dkms virtualbox-guest-dkms</code></pre>

# PHP and ODBC
Most of the following instructions can be done with the help of your terminal and editor of choice. PHP has already been installed on the VM but to make it work with OntoWiki we need two additional packages:

<pre><code>$ sudo apt-get install php5-odbc libapache2-mod-php5</code></pre>

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
post_max_size = 16M
short_open_tag = On
</code></pre>


# OntoWiki
<pre><code class='bash'>$ cd /var/www/html
$ sudo mkdir OntoWiki
$ sudo chown -R elag:elag OntoWiki
$ sudo apt-get install git
$ git clone https://github.com/AKSW/OntoWiki.git OntoWiki 
$ cd OntoWiki
$ sudo apt-get install make
$ make deploy
</code></pre>

You can enable debugging in OntoWiki by editing config.ini (copy and rename config.ini.dist before)

# Virtuoso
If you are using the virtual machine you can install it from the official repositories:

<pre><code>$ sudo apt-get install virtuoso</code></pre>  

You can now start the database server daemon with 
<pre><code>$ sudo service virtuoso-opensource-6.1 start</code></pre> 

Afterwards you can access the Virtuoso Conductor in your browser at <code-inline>http://localhost:8890/</code-inline> to assure Virtuoso is running.

## Configuration
The central configuration file is located at <code-inline>/etc/virtuoso-opensource-6.1/virtuoso.ini</code-inline>. In that file add your OntoWiki directory to the <code-inline>DirsAllowed</code-inline> parameter:

<pre><code class='apache'>DirsAllowed = ., /usr/share/virtuoso-opensource-6.1/vad/, /path/to/OntoWiki/</code></pre>

Now restart Virtuoso to let the changes take effect.
<pre><code>$ sudo service virtuoso-opensource-6.1 restart</code></pre> 

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

# Apache/OntoWiki Part 2
Once Virtuoso, ODBC and PHP are running we can finally configure the Apache Webserver and OntoWiki. First, edit <code-inline>/etc/apache2/sites-enabled/000-default.conf</code-inline>

<pre><code class='xml'><Directory "/var/www/html">
Options Indexes [FollowSymLinks](./FollowSymLinks.markdown)
AllowOverride All 
&lt;/Directory>
</code></pre>

Now Restart apache.
<pre><code class='bash'>$ sudo service apache2 restart</code></pre> 

And don't forget to activate Apache's mod rewriting.
<pre><code class='bash'>$ sudo a2enmod rewrite</code></pre> 

Now checkout the required branch and initialize the submodules.
<pre><code class='bash'>$ git checkout --track -b deployment/erm-hd origin/deployment/erm-hd
$ git submodules init
$ git submodules update
</code></pre>

Finally check [http://localhost/OntoWiki](http://localhost/OntoWiki) if OntoWiki is running correctly.


