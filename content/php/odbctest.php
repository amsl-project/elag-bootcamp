<?php
$conn   = odbc_connect('VOS', 'dba', 'dba');
$query  = 'SELECT DISTINCT ?g WHERE {GRAPH ?g {?s ?p ?o.}}';
$result = odbc_exec($conn, 'CALL DB.DBA.SPARQL_EVAL(\'' . $query . '\', NULL, 0)');
if (count(odbc_fetch_array($result)) !== 0) {
    echo ' ODBC Test OK :)';
} else {
    echo odbc_errormsg();
    echo ', ODBC Test failed :(';
}
?>