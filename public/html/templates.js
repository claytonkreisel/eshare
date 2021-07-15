var templates = {"components":{"BarChart.html":{"v":4,"t":[{"t":7,"e":"canvas","m":[{"n":"width","f":"100%","t":13,"g":1}]}]},"LeafletMap.html":{"v":4,"t":[{"t":7,"e":"div","m":[{"t":13,"n":"class","f":"map","g":1}]}]}},"views":{"home.html":{"v":4,"t":[{"t":7,"e":"div","m":[{"t":13,"n":"class","f":"view home","g":1}],"f":[{"t":7,"e":"h1","f":["Asset ",{"t":7,"e":"em","f":["Alpha"]}," Dashboard"]}," ",{"t":7,"e":"div","m":[{"t":13,"n":"class","f":"charts","g":1}],"f":[{"t":7,"e":"div","m":[{"t":13,"n":"class","f":"chart","g":1}],"f":[{"t":7,"e":"speeding-bar-chart","m":[{"n":"months","f":[{"t":2,"r":"speedingMonths"}],"t":13}]}]}," ",{"t":7,"e":"div","m":[{"t":13,"n":"class","f":"chart","g":1}],"f":[{"t":7,"e":"idling-bar-chart","m":[{"n":"months","f":[{"t":2,"r":"idlingMonths"}],"t":13}]}]}]}," ",{"t":7,"e":"div","m":[{"t":13,"n":"class","f":"maps","g":1}],"f":[{"t":7,"e":"div","m":[{"t":13,"n":"class","f":"map-container","g":1}],"f":[{"t":7,"e":"h3","f":[{"t":7,"e":"em","f":["Alpha"]}," Start Location"]}," ",{"t":7,"e":"map","m":[{"n":"zoom","f":"17","t":13,"g":1},{"n":"type","f":"light","t":13,"g":1},{"n":"latitude","f":[{"t":2,"r":"startCenter.latitude"}],"t":13},{"n":"longitude","f":[{"t":2,"r":"startCenter.longitude"}],"t":13}]}]}," ",{"t":7,"e":"div","m":[{"t":13,"n":"class","f":"map-container","g":1}],"f":[{"t":7,"e":"h3","f":[{"t":7,"e":"em","f":["Alpha"]}," End Location"]}," ",{"t":7,"e":"map","m":[{"n":"zoom","f":"18","t":13,"g":1},{"n":"type","f":"satellite","t":13,"g":1},{"n":"latitude","f":[{"t":2,"r":"endCenter.latitude"}],"t":13},{"n":"longitude","f":[{"t":2,"r":"endCenter.longitude"}],"t":13}]}]}]}]}]}}};

export default templates;