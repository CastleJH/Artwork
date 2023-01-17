// must always set precision
precision mediump float;

// p5.js built-in uniform variables
uniform mat4 uModelViewMatrix; // modelview matrix (object space -> eye space)
uniform mat4 uProjectionMatrix; // projection matrix (camera space -> clip space)
uniform mat3 uNormalMatrix; // inverse transpose of modelview matrix
uniform mat4 uViewMatrix; // camera matrix (world space -> eye space)
uniform vec3 uLightingDirection; // directional light direction
uniform vec4 uMaterialColor; // current fill color

// p5.js built-in attribute variables
attribute vec3 aPosition;
attribute vec3 aNormal;
attribute vec2 aTexCoord;

// varying variables that are rasterized and passed to fragment shader
varying vec4 vCol;
varying vec3 vNormal;
varying vec3 vLightDir;
varying vec2 vUV;

void main() {
  
 vUV = aTexCoord;
 // position in clip space
 vec4 pos = vec4(aPosition, 1.0);
 gl_Position = uProjectionMatrix * uModelViewMatrix * pos;
 // diffuse color
 vCol = uMaterialColor;

 // normal vector in eye space
 vNormal = uNormalMatrix * aNormal;

 // light vector in eye space
 vLightDir = (uViewMatrix * vec4(-uLightingDirection, 0.0)).xyz;
}