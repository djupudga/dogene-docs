
var mod = docTree.type,
    name = docTree.name

document.getElementById('module').innerHTML = docTree.tree[0].type
document.getElementById('module-name').innerHTML = docTree.tree[0].name
document.getElementById('module-doc').innerHTML = docTree.tree[0].doc