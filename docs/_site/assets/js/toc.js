(function(){
  function slugify(s){
    return s.toLowerCase().trim().replace(/[^a-z0-9\s-]/g,'').replace(/\s+/g,'-');
  }

  function buildTOC(container, content){
    if(!container || !content) return;
    var headings = content.querySelectorAll('h2, h3');
    if(headings.length===0) { container.style.display='none'; return; }
    var ul = document.createElement('ul');
    var lastLevel = 2;
    var parents = [ul];

    headings.forEach(function(h){
      var level = parseInt(h.tagName.substring(1),10);
      var id = h.id || slugify(h.textContent);
      if(!h.id) h.id = id;
      var li = document.createElement('li');
      li.classList.add('toc-level-' + level);
      var a = document.createElement('a');
      a.href = '#'+id;
      a.textContent = h.textContent;
      a.onclick = function(){ document.querySelectorAll('.toc a.active').forEach(function(x){x.classList.remove('active')}); a.classList.add('active'); };
      li.appendChild(a);

      if(level > lastLevel){
        // create nested ul under the previous list item
        var newUl = document.createElement('ul');
        if(parents[0].lastElementChild) parents[0].lastElementChild.appendChild(newUl);
        parents.unshift(newUl);
      } else if(level < lastLevel){
        // pop back to the appropriate parent level
        while(parents.length > 1 && level <= (parseInt(parents[0].parentNode.className.replace(/[^0-9]/g,''),10) || 2)){
          parents.shift();
        }
      }
      parents[0].appendChild(li);
      lastLevel = level;
    });

    // If there's an Introduction anchor, create a top-level 'Introduction' entry
    var introHeading = content.querySelector('#introduction') || content.querySelector('h1');
    if(introHeading){
      var introId = introHeading.id || slugify(introHeading.textContent || 'introduction');
      introHeading.id = introId;
      var introLi = document.createElement('li');
      introLi.classList.add('toc-level-1');
      var introA = document.createElement('a');
      introA.href = '#'+introId;
      introA.textContent = 'Introduction';
      introLi.appendChild(introA);
      var introSub = document.createElement('ul');
      introLi.appendChild(introSub);

      // move matching subsection items under Introduction
      var subsectionNames = ['project scope and description','glossary of terms','references'];
      var moved = false;
      var children = Array.prototype.slice.call(ul.children);
      children.forEach(function(child){
        var a = child.querySelector('a');
        if(!a) return;
        var text = a.textContent.trim().toLowerCase();
        if(subsectionNames.indexOf(text) !== -1){
          introSub.appendChild(child);
          moved = true;
        }
      });

      if(moved){
        // insert Introduction at the top of the list
        ul.insertBefore(introLi, ul.firstChild);
      }
    }

    // append the built list
    container.appendChild(ul);

    // add toggles for items that have children
    Array.prototype.forEach.call(container.querySelectorAll('li'), function(li){
      var childUL = li.querySelector('ul');
      if(childUL){
        var btn = document.createElement('button');
        btn.className = 'toc-toggle';
        btn.setAttribute('aria-expanded','true');
        btn.onclick = function(e){
          e.stopPropagation();
          var expanded = btn.getAttribute('aria-expanded') === 'true';
          btn.setAttribute('aria-expanded', expanded ? 'false' : 'true');
          li.classList.toggle('collapsed', expanded);
        };
        // insert the toggle before the link text
        li.insertBefore(btn, li.firstChild);
      }
    });

    // highlight on scroll (recompute positions)
    var tocLinks = container.querySelectorAll('a');
    var headingTops = [];
    function computeTops(){ headingTops = Array.prototype.map.call(headings, function(h){ return {id: h.id, top: h.getBoundingClientRect().top + window.scrollY}; }); }
    computeTops();

    function onScroll(){
      var pos = window.scrollY + 10;
      var current = null;
      for(var i=0;i<headingTops.length;i++){
        if(pos >= headingTops[i].top) current = headingTops[i].id;
      }
      tocLinks.forEach(function(a){ a.classList.toggle('active', a.getAttribute('href') === ('#'+current)); });
    }
    window.addEventListener('scroll', onScroll, {passive:true});
    window.addEventListener('resize', function(){ computeTops(); });
    onScroll();
  }

  document.addEventListener('DOMContentLoaded', function(){
    var tocContainer = document.getElementById('toc-content');
    var pageContent = document.getElementById('page-content');
    buildTOC(tocContainer, pageContent);
  });
})();
