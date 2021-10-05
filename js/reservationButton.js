
    var canvas = document.getElementById("renderCanvas");

    var engine = null;
    var scene = null;
    var sceneToRender = null;
    var createDefaultEngine = function() {return new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true,  disableWebGL2Support: false}); };
    var createScene = function () {

        // This creates a basic Babylon Scene object (non-mesh)
        var scene = new BABYLON.Scene(engine);
    
        // This creates and positions a free camera (non-mesh)
        var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
    
        // This targets the camera to scene origin
        camera.setTarget(BABYLON.Vector3.Zero());
    
        // This attaches the camera to the canvas
        camera.attachControl(canvas, true);
    
        // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
        var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
    
        // Default intensity is 1. Let's dim the light a small amount
        light.intensity = 0.7;
    
        // Our built-in 'sphere' shape. Params: name, subdivs, size, scene
        var sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 2, scene);
    
        // Move the sphere upward 1/2 its height
        sphere.position.y = 1;
    
        // Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene
        var ground = BABYLON.Mesh.CreateGround("ground1", 6, 6, 2, scene);
    
        // GUI
        var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
        advancedTexture.idealWidth = 600;
        
        var rect1 = new BABYLON.GUI.Rectangle();
        rect1.width = 0.2;
        rect1.height = "40px";
        rect1.cornerRadius = 20;
        rect1.color = "Orange";
        rect1.thickness = 4;
        rect1.background = "green";
        advancedTexture.addControl(rect1);
        rect1.linkWithMesh(sphere);   
        rect1.linkOffsetY = -150;
    
        var label = new BABYLON.GUI.TextBlock();
        label.text = "Sphere";
        rect1.addControl(label);
    
        var target = new BABYLON.GUI.Ellipse();
        target.width = "40px";
        target.height = "40px";
        target.color = "Orange";
        target.thickness = 4;
        target.background = "green";
        advancedTexture.addControl(target);
        target.linkWithMesh(sphere);   
    
        var line = new BABYLON.GUI.Line();
        line.lineWidth = 4;
        line.color = "Orange";
        line.y2 = 5;
        line.linkOffsetY = -20;
        advancedTexture.addControl(line);
        line.linkWithMesh(sphere); 
        line.connectedControl = rect1;  

        /*BABYLON.SceneLoader.Append("/obj", "bell.obj", scene, function (scene) {
        });
        return scene;*/
    };

            initFunction = async function() {               
                var asyncEngineCreation = async function() {
                    try {
                    return createDefaultEngine();
                    } catch(e) {
                    console.log("the available createEngine function failed. Creating the default engine instead");
                    return createDefaultEngine();
                    }
                }

                engine = await asyncEngineCreation();
    if (!engine) throw 'engine should not be null.';
    scene = createScene();};
    initFunction().then(() => {sceneToRender = scene        
        engine.runRenderLoop(function () {
            if (sceneToRender && sceneToRender.activeCamera) {
                sceneToRender.render();
            }
        });
    });

    // Resize
    window.addEventListener("resize", function () {
        engine.resize();
    });
