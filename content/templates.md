---
title: "Start"
---

# Template for Templates

    @base <http://elag.templates/> .
    @prefix owl: <http://www.w3.org/2002/07/owl#> .
    @prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
    @prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
    @prefix ns0: <http://vocab.ub.uni-leipzig.de/bibrm/> .

    <TemplateForTemplates> ns0:bindsClass ns0:Template ;
                           ns0:providesProperty ns0:bindsClass, ns0:optionalProperty, ns0:providesProperty ;
                           a ns0:Template .


# Template for FOAF Person

    @base <http://elag.templates/> .
    @prefix owl: <http://www.w3.org/2002/07/owl#> .
    @prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
    @prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
    @prefix ns0: <http://vocab.ub.uni-leipzig.de/bibrm/> .

    <http://elag2014.org/Templates/Template/Temlate_for_FOAF_Person> ns0:bindsClass <http://xmlns.com/foaf/0.1/Person> ;
        ns0:providesProperty <http://xmlns.com/foaf/0.1/firstName>, 
        <http://xmlns.com/foaf/0.1/lastName>,  
        <http://xmlns.com/foaf/0.1/knows>, 
        <favoriteMovie>, 
        <favoriteActor>;
    a ns0:Template ;
    rdfs:label "Temlate for FOAF Person" .