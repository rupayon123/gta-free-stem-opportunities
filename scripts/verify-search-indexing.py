"""Check the exported public search signals before publishing."""
from pathlib import Path
from html.parser import HTMLParser
import json
import xml.etree.ElementTree as ET
from urllib.parse import urlsplit, unquote

site = 'https://gta-free-stem.pages.dev'
root = Path('out')
class Head(HTMLParser):
    def __init__(self):
        super().__init__(); self.canonicals=[]; self.robots=[]; self.title=''; self.in_title=False; self.graphs=[]; self.in_graph=False; self.graph=''
    def handle_starttag(self, tag, attrs):
        a=dict(attrs)
        if tag=='title':self.in_title=True
        if tag=='link' and a.get('rel')=='canonical':self.canonicals.append(a.get('href'))
        if tag=='meta' and a.get('name')=='robots':self.robots.append(a.get('content',''))
        if tag=='script' and a.get('type')=='application/ld+json':self.in_graph=True;self.graph=''
    def handle_endtag(self,tag):
        if tag=='title':self.in_title=False
        if tag=='script' and self.in_graph:self.graphs.append(json.loads(self.graph));self.in_graph=False
    def handle_data(self,data):
        if self.in_title:self.title+=data
        if self.in_graph:self.graph+=data
sitemap=ET.parse(root/'sitemap.xml').getroot()
urls=[node.text for node in sitemap.findall('{*}url/{*}loc')]
assert len(urls)==len(set(urls)) and len(urls)>6000
max_bytes=0
for url in urls:
    parsed=urlsplit(url)
    assert parsed.scheme=='https' and parsed.netloc==urlsplit(site).netloc,url
    path=unquote(parsed.path).strip('/')
    file=root/path/'index.html' if path else root/'index.html'
    text=file.read_text(); h=Head();h.feed(text)
    assert h.canonicals==[url],(url,h.canonicals)
    assert h.title and not any('noindex' in directive.lower() for directive in h.robots),url
    max_bytes=max(max_bytes,len(text.encode()))
    for graph in h.graphs:assert isinstance(graph,dict),url
home=Head();home.feed((root/'index.html').read_text())
assert home.title=='GTA Free STEM Opportunities | Free Activities for Every Age',home.title
websites=[v for graph in home.graphs for v in graph.get('@graph',[]) if v.get('@type')=='WebSite']
assert len(websites)==1 and websites[0]['url']==site
assert 'GTA Free STEM' in websites[0]['alternateName']
assert (root/'googleafb8aa8a0befb71d.html').read_text().strip()=='google-site-verification: googleafb8aa8a0befb71d.html'
robots=(root/'robots.txt').read_text();assert 'Disallow: /' not in robots and f'Sitemap: {site}/sitemap.xml' in robots
assert max_bytes<2_000_000,max_bytes
print(json.dumps({'searchIndexingChecks':'passed','sitemapUrls':len(urls),'selfCanonicalHtmlPages':len(urls),'maximumHtmlBytes':max_bytes,'brand':'GTA Free STEM Opportunities','verificationFilePreserved':True,'robotsAllowsCrawling':True}))
