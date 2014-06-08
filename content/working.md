---
title: "Working with data"
---

# Interesting Queries

## Query 1 : Find all classes of the movies knowledge base

<pre><code class='sql'>PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

SELECT DISTINCT ?object WHERE 
{
    ?subject rdf:type ?object .
}
</code></pre>

## Query 2 : Find all instances of all classes of the movies knowledge base

<pre><code class='sql'>PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

SELECT DISTINCT ?subject WHERE 
{
    ?subject rdf:type ?object .
}
</code></pre>

## Query 3 : Find all instances of the class film

<pre><code class='sql'>PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

SELECT DISTINCT ?subject WHERE 
{
    ?subject rdf:type <http://dbpedia.org/ontology/Film> .
}
</code></pre>

## Query 4 : Find all films of a single actor

<pre><code class='sql'>PREFIX dbo:     <http://dbpedia.org/property/>
PREFIX dbpedia: <http://dbpedia.org/resource/>

SELECT DISTINCT ?film WHERE 
{
    ?film dbo:starring dbpedia:Akshaye_Khanna .
}
</code></pre>

## Query 5 : Find all films starring Maya Sansa and Regina Orioli

<pre><code class='sql'>PREFIX dbo:     <http://dbpedia.org/property/>
PREFIX dbpedia: <http://dbpedia.org/resource/>

SELECT DISTINCT ?film WHERE 
{
    ?film dbo:starring dbpedia:Maya_Sansa    .
    ?film dbo:starring dbpedia:Regina_Orioli .
}
</code></pre>

## Query 6 : Find all films where the producer name contains 'Lee' and the actor name contains 'Sang-min'

<pre><code class='sql'>PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX dbo:  <http://dbpedia.org/property/>
PREFIX dbp:  <http://dbpedia.org/property/>

SELECT DISTINCT ?film ?label WHERE 
{
    ?film dbp:producer ?producer ;
          dbo:starring ?actor ;
          foaf:name    ?label .
  
    FILTER regex( str(?producer), "Lee" ) .
        FILTER regex( str(?actor),    "Sang") .
}
ORDER BY ?label
</code></pre> 

## Query 7 : Find all films where the director, producer and actor is the same person

<pre><code class='sql'>PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX dbo:  <http://dbpedia.org/ontology/>
PREFIX dbp:  <http://dbpedia.org/property/>

SELECT DISTINCT ?fname ?producer WHERE 
{
    ?film dbp:producer ?producer ;      
              dbp:starring ?producer ;
          dbo:director ?producer ;
          foaf:name    ?fname .
}
</code></pre> 

## Query 8 : Find all films where the director, producer and actor is the same person

<pre><code class='sql'>PREFIX dbo: <http://dbpedia.org/ontology/>
PREFIX dbr: <http://dbpedia.org/resource/>

select distinct ?actor ?m_Hanks ?m_Depp where 
{
    ?m_Hanks a            dbo:Film ;
             dbo:starring dbr:Tom_Hanks ;
             dbo:starring ?actor .

    ?m_Depp  a            dbo:Film ;
             dbo:starring dbr:Johnny_Depp ;
             dbo:starring ?actor .
}
ORDER BY ?actor 
</code></pre> 