---
title: "ISQL"
---

# Graph manipulations with iSQL

OntoWiki offers an abstraction layer between the user and the triplestore. It is often sufficient (and comfortable) to rely solely on the OntoWiki GUI. When we get closer to 'big data' (in terms of number of triples), importing and exporting data via OntoWiki can be slow or even impossible. Also creating backups on a regular basis can quickly become a chore.

In these cases it is better to bypass the OntoWiki GUI completely. As a programmer, you would also want to bypass any GUI at all and get to a CLI. To access Virtuoso from the console, we can use an interactive SQL shell. Virtuoso comes with its own version which we can invoke by typing

    $ isql-vt

We can also access the isql shell via the Virtuoso conductor, however the CLI can easily be used with scripts, e.g. by piping lines of codes into the isql-vt. (An alternative way would be to use an odbc library for your language of choice. If you are interested to know how to do this, you can get a basic example by looking at the file `OntoWiki/application/script/odbctest.php`.

The `iSQL` can be used to run `SPARQL` queries and also to do `SPARQL` Updates. Generally, you can run a query by prefixing it with the keyword `SPARQL`, try for example:

    SQL> SPARQL SELECT DISTINCT ?g WHERE {GRAPH ?g { ?s ?p ?o . }} ;

    
The iSQL SPARQL interface will give us some more functionality than the 'simple' SPARQL endpoints provided by OntoWiki or the Virtuoso SPARQL endpoint. If the according roles have been granted to the dba user (or rather the user you sign in with) we can also run a SPARQL UPDATE or a SPARQL DELETE to manipulate your graphs on a triple-level. Sadly, going in the depth here lies slightly out of the scope of our bootcamp. For further information, see <http://www.w3.org/TR/2009/WD-sparql11-update-20091022/>

We will focus more on how to use the iSQL to delete and create new graphs. The big advantages here are that you can bypass the PHP upload and post_max limits and, again, that you can import a lot of graphs via a command line script. Also the iSQL shell is significantly faster for large RDF dumps.

## Deleting and creating

The most basic operations are creating and deleting graphs. This can be done by

    SQL> SPARQL CREATE GRAPH <iri>;
    
and

    SQL> SPARQL DROP GRAPH <iri> ;

Sometimes we just want to wipe all data from a graph. We can always delete and create a graph, but this can also be done in one command:

    SQL> SPARQL CLEAR GRAPH <iri> ;
    
### Example: Uploading a Turtle File

Suppose we have a (large) Turtle file 'example.ttl' we want to import into OntoWiki. First of all, we will create a new knowledge base in OntoWiki. We choose the graph IRI to be <<http://www.example.org/example/>>

!! It's important, that the example.ttl is located in a folder that is included in the "dirs_allwowed" key of the virtuoso.ini file. Usually, we just use the /tmp folder.

Then we can use:

    DB.DBA.TTLP_MT(
       file_to_string_output('/tmp/example.ttl'),
       '',
       '<http://www.example.org/example/>'
    );


This it can be somewhat cumbersome to type directly into the `iSQL` shell, it's good practice to type the commands in your preferred text editor and then copy-paste them into the `iSQL` shell. 

*Note*: The second parameter specifies a base IRI for relative IRIs like `</example.org>`. More about this command and also commands for importing rdfxml can be found here: <http://docs.openlinksw.com/virtuoso/fn_ttlp_mt.html>

It is best to use Turtle or even N-Triples as a format, since these formats require minimal parsing. Also, large files can quickly be split into smaller parts with the ``split`` command in case it is necessary to spread out the importing process over several days. Dumps of big graphes (e.g. from the dbpedia or the British Library) can easily be several GB in size. 

## Inserting and deleting triples

To insert or delete triples, we can use the following SPARQL template:
    
    PREFIX pre1: <prefix_IRI1>
        ...
    PREFIX prem: <prefix_IRIm>
    INSERT DATA { 
        GRAPH <IRI> { 
            <s1> <p1> <o1> .
            <s2> <p2> <o2> .
            ...
            <sn> <pn> <on> .
           } 
    }

In place of `INSERT`, we can use `DELETE` to delete triples.

### <i class="icon-pencil"></i> Exercise: Adding data

Using the the isql shell, create a new graph with the IRI `<urn:tinylibrary>`. Using the prefix `dc` as `<http://purl.org/dc/elements/1.1/>` and `bibo` as `<http://purl.org/ontology/bibo/>`, insert these triples:

    <urn:tinylibrary/sense_and_sensibility>
        a bibo:Book ;
        dc:title "Sense and Sensibility" ;
        dc:creator "Jane Austen" .
    <urn:tinylibrary/pride_and_prejudice>
        a bibo:Book ;
        dc:title "Pride and Prejudice" ;
        dc:creator "Jane Austen" .
    <urn:tinylibrary/mansfield_park> 
        a bibo:Book ;
        dc:title "Mansfield Park" ;
        dc:creator "Jane Austen" .

*Hint:* Use a text editor to first build your `SPARQL` command, then copy-paste it into your isql shell. Check in your OntoWiki if your operation was successful.

## Graph manipulations
It might be necessary to construct new triples from existing ones. We will use a slightly different SPARQL command:

    WITH <g1> DELETE { a b c } INSERT { x y z } WHERE { ... }

Here, `g1` is the graph IRI where the parameters `a`, `b`, `c`, `x`, `y`, `z` can either be IRIs or variables which are defined in the ``WHERE`` part. The parameter `c` and `z` can also be literals. The `DELETE` or `INSERT` part can also be omitted.

### <i class="icon-pencil"></i> Exercise: From strings to URIs
Suppose now we want to exchange the string "Jane Austen" with an actual URI and move the text string to the URI. We will use the dbpedia URI for Jane Austen, i.e. `<http://dbpedia.org/resource/Jane_Austen>`. This means we need to add triples of the form

    ?s dc:creator db:Jane_Austen .
    db:Jane_Austen rdfs:label "Jane Austen" .

for every triple of the form

    ?s dc:creator "Jane Austen" .
    
Also we have to delete these triples.



### <i class="icon-pencil"></i> Construct new triples
We could query the books in our tiny library by a sparql query to find all books by Jane Austen. But it might be desirable to have those triples in our triplestore. So for each triple of the form

    <iri> dc:creator db:Jane_Austen .

we need to also add a triple of the form

    db:Jane_Austen foaf:made <iri> .
    
Do this with an appropriate insert statement.

*NB:* This exercise also works if db:Jane_Austen is replaced by a variable. This can be used to construct a large set of triples with very little manual work

*Tip:* It's easy to mess up your data with 'wrong' triples. Repeating a SPARQL command with `DELETE` instead of `INSERT` will *not* always undo the changes. It's advisable to preview the triples that are inserted or deleted. This can be done by using `CONSTRUCT` instead of `DELETE` or `INSERT`. The `CONSTRUCT` command will only display the triples, but not change the triplestore itself.

For a more in-depth view about SPARQL graph manipulations, see <http://virtuoso.openlinksw.com/dataspace/doc/dav/wiki/Main/VirtTipsAndTricksSPARQL11Delete>

