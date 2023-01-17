// must always set precision
precision mediump float;

// uniform variable that we set in this example 
uniform float uBorder;
uniform sampler2D imgTexture;

// what passed into from rasterizer
varying vec4 vCol;
varying vec3 vNormal;
varying vec3 vLightDir;
varying vec2 vUV;

void main() {
 // toon shading
 float l = max(0.0,dot(normalize(vLightDir), normalize(vNormal)));
 float s=0.;

 s = (l > uBorder)? 1.0: (l>uBorder*0.5)? 0.5: 0.0; // three shades
 //s = smoothstep(uBorder*0.5-0.1,uBorder*0.5+0.1,l)*0.5 + smoothstep(uBorder-0.1,uBorder+0.1,l)*0.5; //three shades smooth transition
 //calculate final color
  vec4 textureColor = texture2D(imgTexture, vUV);
 gl_FragColor = textureColor * vec4(s,s,s,1.);
} 
