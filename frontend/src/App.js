import './App.scss';
import Markdown from './components/Markdown/Markdown.component'

function App() {
  const content = String.raw`Given a **formula** ~~below~~
  $$
  s = ut + \frac{1}{2}at^{2}
  $$
  
  $$ 
  CH_3-CH_2-OH 
  $$
  Calculate the value of $s$ when $u = 10\frac{m}{s}$ and $a = 2\frac{m}{s^{2}}$ at $t = 1s$
  
  ![hello](https://www.lamborghini.com/sites/it-en/files/DAM/lamborghini/facelift_2019/models_gw/2023/03_29_revuelto/gate_models_og_01.jpg)
  
  
  ~~~c++
  void make_set(int v) {
      parent[v] = v;
  }
  
  int find_set(int v) {
      if (v == parent[v])
          return v;
      return find_set(parent[v]);
  }
  
  void union_sets(int a, int b) {
      a = find_set(a);
      b = find_set(b);
      if (a != b)
          parent[b] = a;
  }
  ~~~
  
  ~~~js
  console.log('Hello');
  ~~~
  
  > hello
  
  > console.log('Hello');
  `
  
  return (
    <Markdown content={content} />
  );
}

export default App;
