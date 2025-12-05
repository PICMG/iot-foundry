/* glossary.js
   - Exposes hover tooltips for glossary terms declared in site data.
   - Reads `window.GLOSSARY` which is set by the layout and adds in-page hover tooltips.
*/
(function(){
  function escapeRegExp(s){ return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

  function createTooltip(){
    var tip = document.createElement('div');
    tip.id = 'glossary-tooltip';
    tip.setAttribute('aria-hidden','true');
    tip.style.position = 'fixed';
    tip.style.zIndex = 20000;
    tip.style.display = 'none';
    tip.style.maxWidth = '360px';
    tip.style.padding = '8px 10px';
    tip.style.background = '#fff';
    tip.style.border = '1px solid #ddd';
    tip.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
    tip.style.borderRadius = '6px';
    tip.style.fontSize = '13px';
    tip.style.color = '#222';
    document.body.appendChild(tip);
    return tip;
  }

  function showTooltipForElement(el, data, tooltip){
    var key = el.getAttribute('data-term');
    var def = (data && data[key]) || data && data[key.toLowerCase()] || null;
    if(!def) return;
    tooltip.innerHTML = '<strong>' + key + '</strong><div style="margin-top:6px">' + def + '</div>';
    tooltip.style.display = 'block';
    tooltip.setAttribute('aria-hidden','false');
    // position near element
    var rect = el.getBoundingClientRect();
    var left = rect.right + 12;
    var top = rect.top;
    if(left + tooltip.offsetWidth > window.innerWidth - 12){ left = rect.left - tooltip.offsetWidth - 12; }
    if(left < 8) left = 8;
    if(top + tooltip.offsetHeight > window.innerHeight - 12) top = window.innerHeight - tooltip.offsetHeight - 12;
    tooltip.style.left = left + 'px';
    tooltip.style.top = top + 'px';
  }

  function hideTooltip(tooltip){ tooltip.style.display = 'none'; tooltip.setAttribute('aria-hidden','true'); }

  function walkAndReplace(root, terms, data, tooltip){
    terms.sort(function(a,b){ return b.length - a.length; });
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null, false);
    var nodes = [];
    var n;
    while(n = walker.nextNode()){ nodes.push(n); }
    nodes.forEach(function(textNode){
      var parent = textNode.parentNode;
      if(!parent) return;
      var tag = parent.nodeName && parent.nodeName.toLowerCase();
      var skipTags = ['a','code','pre','script','style','button','textarea'];
      if(skipTags.indexOf(tag) !== -1) return;
      var ancestor = parent;
      var insidePage = false;
      while(ancestor){
        if(ancestor.id === 'page-content'){ insidePage = true; break; }
        if(ancestor.classList && ancestor.classList.contains('toc')) return;
        ancestor = ancestor.parentNode;
      }
      if(!insidePage) return;

      var text = textNode.nodeValue;
      var frag = document.createDocumentFragment();
      var cursor = 0;

      while(cursor < text.length){
        var found = null;
        var foundTerm = null;
        var foundIndex = -1;
        for(var i=0;i<terms.length;i++){
          var term = terms[i];
          var esc = escapeRegExp(term);
          var re = new RegExp('(^|[^A-Za-z0-9_])(' + esc + ')(?=[^A-Za-z0-9_]|$)','i');
          var substr = text.slice(cursor);
          var m = re.exec(substr);
          if(m){
            var idx = cursor + m.index + m[1].length;
            if(found === null || idx < foundIndex){ found = m; foundTerm = term; foundIndex = idx; }
          }
        }
        if(!found){ frag.appendChild(document.createTextNode(text.slice(cursor))); break; }
        if(foundIndex > cursor){ frag.appendChild(document.createTextNode(text.slice(cursor, foundIndex))); }
        var matchedText = text.slice(foundIndex, foundIndex + found[2].length);
        var span = document.createElement('span');
        span.className = 'glossary-term';
        span.setAttribute('data-term', foundTerm);
        span.setAttribute('tabindex','0');
        span.textContent = matchedText;
        frag.appendChild(span);
        cursor = foundIndex + found[2].length;
      }
      parent.replaceChild(frag, textNode);
    });

    // attach events
    Array.prototype.forEach.call(root.querySelectorAll('span.glossary-term'), function(span){
      span.addEventListener('mouseenter', function(e){ showTooltipForElement(e.currentTarget, data, tooltip); });
      span.addEventListener('focus', function(e){ showTooltipForElement(e.currentTarget, data, tooltip); });
      span.addEventListener('mouseleave', function(){ hideTooltip(tooltip); });
      span.addEventListener('blur', function(){ hideTooltip(tooltip); });
    });
  }

  document.addEventListener('DOMContentLoaded', function(){
    if(!window.GLOSSARY) return;
    var data = window.GLOSSARY;
    var terms = Object.keys(data || {});
    if(!terms || terms.length === 0) return;
    var page = document.getElementById('page-content');
    if(!page) return;
    var tooltip = createTooltip();
    walkAndReplace(page, terms, data, tooltip);
  });
})();
/* glossary.js
   - Exposes hover tooltips for glossary terms declared in site data.
   - Relies on a global `GLOSSARY` object emitted by the layout via Liquid.
*/
(function(){
  function escapeRegExp(s){ return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

  // Replace text nodes under `root` by matching each glossary term individually.
  function walkAndReplace(root, terms, data){
    // Sort terms by length descending so longest matches are attempted first
    terms.sort(function(a,b){ return b.length - a.length; });
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null, false);
    var nodes = [];
    var n;
    while(n = walker.nextNode()){ nodes.push(n); }
    nodes.forEach(function(textNode){
      var parent = textNode.parentNode;
      if(!parent) return;
      var tag = parent.nodeName && parent.nodeName.toLowerCase();
      var skipTags = ['a','code','pre','script','style','button','textarea'];
      if(skipTags.indexOf(tag) !== -1) return;
      // avoid replacing inside the TOC or outside page-content
      var ancestor = parent;
      var insidePage = false;
      while(ancestor){
        if(ancestor.id === 'page-content') { insidePage = true; break; }
        if(ancestor.classList && ancestor.classList.contains('toc')) return;
        ancestor = ancestor.parentNode;
      }
      if(!insidePage) return;

      var text = textNode.nodeValue;
      var frag = document.createDocumentFragment();
      var cursor = 0;

      while(cursor < text.length){
        var found = null;
        var foundTerm = null;
        var foundIndex = -1;
        // attempt each term
        for(var i=0;i<terms.length;i++){
          var term = terms[i];
          var esc = escapeRegExp(term);
          // match term with non-word char or start before, and non-word or end after
          var re = new RegExp('(^|[^A-Za-z0-9_])(' + esc + ')(?=[^A-Za-z0-9_]|$)','i');
          var substr = text.slice(cursor);
          var m = re.exec(substr);
          if(m){
            var idx = cursor + m.index + m[1].length;
            if(found === null || idx < foundIndex){ found = m; foundTerm = term; foundIndex = idx; }
          }
        }

        if(!found){
          // append remainder and break
          frag.appendChild(document.createTextNode(text.slice(cursor)));
          break;
        }

        // append text up to match
        if(foundIndex > cursor){ frag.appendChild(document.createTextNode(text.slice(cursor, foundIndex))); }
        var matchedText = text.slice(foundIndex, foundIndex + found[2].length);
        // create replacement span
        var span = document.createElement('span');
        span.className = 'glossary-term';
        span.setAttribute('data-term', foundTerm);
        span.setAttribute('tabindex','0');
        span.textContent = matchedText;
        frag.appendChild(span);
        cursor = foundIndex + found[2].length;
      }

      parent.replaceChild(frag, textNode);
    });
    // After replacement, attach events to created spans
    Array.prototype.forEach.call(root.querySelectorAll('span.glossary-term'), function(span){
      span.addEventListener('mouseenter', function(e){ showFromElement(e.currentTarget, data); });
      span.addEventListener('focus', function(e){ showFromElement(e.currentTarget, data); });
      span.addEventListener('mouseleave', hide); span.addEventListener('blur', hide);
    });
  }

  function createTooltip(){
    var tip = document.createElement('div');
    tip.id = 'glossary-tooltip';
    tip.setAttribute('aria-hidden','true');
    tip.style.position = 'fixed';
    tip.style.zIndex = 20000;
    tip.style.display = 'none';
    tip.style.maxWidth = '320px';
    tip.style.padding = '8px 10px';
    tip.style.background = '#fff';
    tip.style.border = '1px solid #ddd';
    tip.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
    tip.style.borderRadius = '6px';
    tip.style.fontSize = '13px';
    tip.style.color = '#222';
    document.body.appendChild(tip);
    return tip;
  }

  document.addEventListener('DOMContentLoaded', function(){
    if(!window.GLOSSARY) return;
    var data = window.GLOSSARY;
    var terms = Object.keys(data);
    if(terms.length === 0) return;
    var regex = makeTermRegex(terms);
    var page = document.getElementById('page-content');
    if(!page) return;

    var tooltip = createTooltip();

    function makeSpan(text, termKey){
      var span = document.createElement('span');
      span.className = 'glossary-term';
      span.setAttribute('data-term', termKey);
      span.setAttribute('tabindex','0');
      span.textContent = text;
      span.addEventListener('mouseenter', show);
      span.addEventListener('focus', show);
      span.addEventListener('mouseleave', hide);
      span.addEventListener('blur', hide);
      return span;
    }

    function show(ev){
      var el = ev.currentTarget;
      var key = el.getAttribute('data-term');
      var def = data[key];
      if(!def) return;
      tooltip.innerHTML = '<strong>' + key + '</strong><div style="margin-top:6px">' + def + '</div>';
      tooltip.style.display = 'block';
      tooltip.setAttribute('aria-hidden','false');
      var rect = el.getBoundingClientRect();
      var left = rect.right + 12;
      var top = rect.top;
      // if off-screen to right, place left of element
      if(left + tooltip.offsetWidth > window.innerWidth - 12){ left = rect.left - tooltip.offsetWidth - 12; }
      if(left < 8) left = 8;
      if(top + tooltip.offsetHeight > window.innerHeight - 12) top = window.innerHeight - tooltip.offsetHeight - 12;
      tooltip.style.left = left + 'px';
      tooltip.style.top = top + 'px';
    }
    function hide(){ tooltip.style.display = 'none'; tooltip.setAttribute('aria-hidden','true'); }

    // replacer: create span with proper term key (preserve case by using matched text)
    function replacerFactory(){
      return function(matched){
        // find key by case-insensitive match
        var key = Object.keys(data).find(function(k){ return k.toLowerCase() === matched.toLowerCase(); });
        if(!key) key = matched;
        return makeSpan(matched, key);
      };
    }

    walkAndReplace(page, regex, replacerFactory());
  });
})();
