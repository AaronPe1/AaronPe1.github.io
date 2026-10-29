// Merge static opaque pieces by material; seats/grass stay instanced and the flag stays animated.
export function batchStadium(T, scene, flag) {
  scene.updateMatrixWorld(true);
  const groups = new Map();
  scene.traverse(object => {
    if (!object.isMesh || object.isInstancedMesh || object === flag || Array.isArray(object.material)) return;
    const material = object.material, geometry = object.geometry;
    if (material.transparent || object.matrixWorld.determinant() < 0 || !geometry.attributes.normal || !geometry.attributes.uv) return;
    const key = `${material.uuid}/${object.castShadow}/${object.receiveShadow}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(object);
  });
  for (const objects of groups.values()) {
    if (objects.length < 2) continue;
    const pieces = objects.map(object => {
      const geometry = object.geometry.index ? object.geometry.toNonIndexed() : object.geometry.clone();
      return geometry.applyMatrix4(object.matrixWorld);
    });
    const merged = new T.BufferGeometry();
    for (const name of ['position', 'normal', 'uv']) {
      const size = pieces[0].attributes[name].itemSize;
      const data = new Float32Array(pieces.reduce((sum, piece) => sum + piece.attributes[name].array.length, 0));
      let offset = 0;
      for (const piece of pieces) { data.set(piece.attributes[name].array, offset); offset += piece.attributes[name].array.length; }
      merged.setAttribute(name, new T.BufferAttribute(data, size));
    }
    merged.computeBoundingSphere();
    const mesh = new T.Mesh(merged, objects[0].material);
    mesh.castShadow = objects[0].castShadow;
    mesh.receiveShadow = objects[0].receiveShadow;
    for (const object of objects) { object.removeFromParent(); object.geometry.dispose(); }
    pieces.forEach(piece => piece.dispose());
    scene.add(mesh);
  }
}
