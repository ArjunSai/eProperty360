window.libpannellum = function(F, f, p) {
    function ja(Z) {
        function R(a, d) {
            return 1 == a.level && 1 != d.level ? -1 : 1 == d.level && 1 != a.level ? 1 : d.timestamp - a.timestamp
        }
        function na(a, d) {
            return a.level != d.level ? a.level - d.level : a.diff - d.diff
        }
        function M(a, d, c, f, k, g) {
            this.vertices = a;
            this.side = d;
            this.level = c;
            this.x = f;
            this.y = k;
            this.path = g.replace("%s", d).replace("%l", c).replace("%x", f).replace("%y", k)
        }
        function La(a, d, f, p, k) {
            var g;
            var e = d.vertices;
            g = oa(a, e.slice(0, 3));
            var s = oa(a, e.slice(3, 6))
              , z = oa(a, e.slice(6, 9))
              , e = oa(a, e.slice(9, 12))
              , n = g[0] + s[0] + z[0] + e[0];
            -4 == n || 4 == n ? g = !1 : (n = g[1] + s[1] + z[1] + e[1],
            g = -4 == n || 4 == n ? !1 : 4 != g[2] + s[2] + z[2] + e[2]);
            if (g) {
                g = d.vertices;
                s = g[0] + g[3] + g[6] + g[9];
                z = g[1] + g[4] + g[7] + g[10];
                e = g[2] + g[5] + g[8] + g[11];
                n = Math.sqrt(s * s + z * z + e * e);
                e = Math.asin(e / n);
                s = Math.atan2(z, s) - p;
                s += s > Math.PI ? -2 * Math.PI : s < -Math.PI ? 2 * Math.PI : 0;
                s = Math.abs(s);
                d.diff = Math.acos(Math.sin(f) * Math.sin(e) + Math.cos(f) * Math.cos(e) * Math.cos(s));
                s = !1;
                for (z = 0; z < c.nodeCache.length; z++)
                    if (c.nodeCache[z].path == d.path) {
                        s = !0;
                        c.nodeCache[z].timestamp = c.nodeCacheTimestamp++;
                        c.nodeCache[z].diff = d.diff;
                        c.currentNodes.push(c.nodeCache[z]);
                        break
                    }
                s || (d.timestamp = c.nodeCacheTimestamp++,
                c.currentNodes.push(d),
                c.nodeCache.push(d));
                if (d.level < c.level) {
                    var e = m.cubeResolution * Math.pow(2, d.level - m.maxLevel)
                      , s = Math.ceil(e * m.invTileResolution) - 1
                      , z = e % m.tileResolution * 2
                      , l = 2 * e % m.tileResolution;
                    0 === l && (l = m.tileResolution);
                    0 === z && (z = 2 * m.tileResolution);
                    n = 0.5;
                    if (d.x == s || d.y == s)
                        n = 1 - m.tileResolution / (m.tileResolution + l);
                    var x = 1 - n
                      , e = []
                      , t = n
                      , y = n
                      , C = n
                      , H = x
                      , I = x
                      , A = x;
                    if (l < m.tileResolution)
                        if (d.x == s && d.y != s) {
                            if (I = y = 0.5,
                            "d" == d.side || "u" == d.side)
                                A = C = 0.5
                        } else
                            d.x != s && d.y == s && (H = t = 0.5,
                            "l" == d.side || "r" == d.side) && (A = C = 0.5);
                    z <= m.tileResolution && (d.x == s && (t = 0,
                    H = 1,
                    "l" == d.side || "r" == d.side) && (C = 0,
                    A = 1),
                    d.y == s && (y = 0,
                    I = 1,
                    "d" == d.side || "u" == d.side) && (C = 0,
                    A = 1));
                    l = [g[0], g[1], g[2], g[0] * t + g[3] * H, g[1] * n + g[4] * x, g[2] * C + g[5] * A, g[0] * t + g[6] * H, g[1] * y + g[7] * I, g[2] * C + g[8] * A, g[0] * n + g[9] * x, g[1] * y + g[10] * I, g[2] * C + g[11] * A];
                    l = new M(l,d.side,d.level + 1,2 * d.x,2 * d.y,m.fullpath);
                    e.push(l);
                    d.x == s && z <= m.tileResolution || (l = [g[0] * t + g[3] * H, g[1] * n + g[4] * x, g[2] * C + g[5] * A, g[3], g[4], g[5], g[3] * n + g[6] * x, g[4] * y + g[7] * I, g[5] * C + g[8] * A, g[0] * t + g[6] * H, g[1] * y + g[7] * I, g[2] * C + g[8] * A],
                    l = new M(l,d.side,d.level + 1,2 * d.x + 1,2 * d.y,m.fullpath),
                    e.push(l));
                    d.x == s && z <= m.tileResolution || d.y == s && z <= m.tileResolution || (l = [g[0] * t + g[6] * H, g[1] * y + g[7] * I, g[2] * C + g[8] * A, g[3] * n + g[6] * x, g[4] * y + g[7] * I, g[5] * C + g[8] * A, g[6], g[7], g[8], g[9] * t + g[6] * H, g[10] * n + g[7] * x, g[11] * C + g[8] * A],
                    l = new M(l,d.side,d.level + 1,2 * d.x + 1,2 * d.y + 1,m.fullpath),
                    e.push(l));
                    d.y == s && z <= m.tileResolution || (l = [g[0] * n + g[9] * x, g[1] * y + g[10] * I, g[2] * C + g[11] * A, g[0] * t + g[6] * H, g[1] * y + g[7] * I, g[2] * C + g[8] * A, g[9] * t + g[6] * H, g[10] * n + g[7] * x, g[11] * C + g[8] * A, g[9], g[10], g[11]],
                    l = new M(l,d.side,d.level + 1,2 * d.x,2 * d.y + 1,m.fullpath),
                    e.push(l));
                    for (d = 0; d < e.length; d++)
                        La(a, e[d], f, p, k)
                }
            }
        }
        function Ma() {
            return [-1, 1, -1, 1, 1, -1, 1, -1, -1, -1, -1, -1, 1, 1, 1, -1, 1, 1, -1, -1, 1, 1, -1, 1, -1, 1, 1, 1, 1, 1, 1, 1, -1, -1, 1, -1, -1, -1, -1, 1, -1, -1, 1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, -1, -1, -1, -1, -1, -1, 1, 1, 1, -1, 1, 1, 1, 1, -1, 1, 1, -1, -1]
        }
        function pa(a, d, c) {
            var f = Math.sin(d);
            d = Math.cos(d);
            if ("x" == c)
                return [a[0], d * a[1] + f * a[2], d * a[2] - f * a[1], a[3], d * a[4] + f * a[5], d * a[5] - f * a[4], a[6], d * a[7] + f * a[8], d * a[8] - f * a[7]];
            if ("y" == c)
                return [d * a[0] - f * a[2], a[1], d * a[2] + f * a[0], d * a[3] - f * a[5], a[4], d * a[5] + f * a[3], d * a[6] - f * a[8], a[7], d * a[8] + f * a[6]];
            if ("z" == c)
                return [d * a[0] + f * a[1], d * a[1] - f * a[0], a[2], d * a[3] + f * a[4], d * a[4] - f * a[3], a[5], d * a[6] + f * a[7], d * a[7] - f * a[6], a[8]]
        }
        function Ga(a) {
            return [a[0], a[4], a[8], a[12], a[1], a[5], a[9], a[13], a[2], a[6], a[10], a[14], a[3], a[7], a[11], a[15]]
        }
        function wa(a) {
            ja(a, a.path + "." + m.extension, function(d, c) {
                a.texture = d;
                a.textureLoaded = c ? 2 : 1
            }, qa.crossOrigin)
        }
        function oa(a, d) {
            var c = [a[0] * d[0] + a[1] * d[1] + a[2] * d[2], a[4] * d[0] + a[5] * d[1] + a[6] * d[2], a[11] + a[8] * d[0] + a[9] * d[1] + a[10] * d[2], 1 / (a[12] * d[0] + a[13] * d[1] + a[14] * d[2])]
              , f = c[0] * c[3]
              , k = c[1] * c[3]
              , c = c[2] * c[3]
              , g = [0, 0, 0];
            -1 > f && (g[0] = -1);
            1 < f && (g[0] = 1);
            -1 > k && (g[1] = -1);
            1 < k && (g[1] = 1);
            if (-1 > c || 1 < c)
                g[2] = 1;
            return g
        }
        function Ha() {
            console.log("Reducing canvas size due to error 1286!");
            E.width = Math.round(E.width / 2);
            E.height = Math.round(E.height / 2)
        }
        var E = f.createElement("canvas");
        E.style.width = E.style.height = "100%";
        Z.appendChild(E);
        var c, a, U, V, $, S, xa, ea, m, y, ka, D, fa, ya, aa, qa;
        this.init = function(G, d, Ra, L, k, g, e, s) {
            function z(a) {
                if (F) {
                    var d = a * a * 4
                      , g = new Uint8ClampedArray(d)
                      , c = s.backgroundColor ? s.backgroundColor : [0, 0, 0];
                    c[0] *= 255;
                    c[1] *= 255;
                    c[2] *= 255;
                    for (var b = 0; b < d; b++)
                        g[b++] = c[0],
                        g[b++] = c[1],
                        g[b++] = c[2];
                    a = new ImageData(g,a,a);
                    for (n = 0; 6 > n; n++)
                        0 == m[n].width && (m[n] = a)
                }
            }
            d === p && (d = "equirectangular");
            if ("equirectangular" != d && "cubemap" != d && "multires" != d)
                throw console.log("Error: invalid image type specified!"),
                {
                    type: "config error"
                };
            y = d;
            m = G;
            ka = Ra;
            qa = s || {};
            if (c) {
                U && (a.detachShader(c, U),
                a.deleteShader(U));
                V && (a.detachShader(c, V),
                a.deleteShader(V));
                a.bindBuffer(a.ARRAY_BUFFER, null);
                a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, null);
                c.texture && a.deleteTexture(c.texture);
                if (c.nodeCache)
                    for (G = 0; G < c.nodeCache.length; G++)
                        a.deleteTexture(c.nodeCache[G].texture);
                a.deleteProgram(c);
                c = p
            }
            ea = p;
            var n, F = !1, x;
            if ("cubemap" == y)
                for (n = 0; 6 > n; n++)
                    0 < m[n].width ? (x === p && (x = m[n].width),
                    x != m[n].width && console.log("Cube faces have inconsistent widths: " + x + " vs. " + m[n].width)) : F = !0;
            "cubemap" == y && 0 !== (x & x - 1) && (navigator.userAgent.toLowerCase().match(/(iphone|ipod|ipad).* os 8_/) || navigator.userAgent.toLowerCase().match(/(iphone|ipod|ipad).* os 9_/) || navigator.userAgent.toLowerCase().match(/(iphone|ipod|ipad).* os 10_/) || navigator.userAgent.match(/Trident.*rv[ :]*11\./)) || (a || (a = E.getContext("experimental-webgl", {
                alpha: !1,
                depth: !1
            })),
            a && 1286 == a.getError() && Ha());
            if (!a && ("multires" == y && m.hasOwnProperty("fallbackPath") || "cubemap" == y) && ("WebkitAppearance"in f.documentElement.style || navigator.userAgent.match(/Trident.*rv[ :]*11\./) || -1 !== navigator.appVersion.indexOf("MSIE 10"))) {
                S && Z.removeChild(S);
                S = f.createElement("div");
                S.className = "pnlm-world";
                L = m.basePath ? m.basePath + m.fallbackPath : m.fallbackPath;
                var M = "frblud".split("")
                  , R = 0;
                k = function() {
                    var a = f.createElement("canvas");
                    a.className = "pnlm-face pnlm-" + M[this.side] + "face";
                    S.appendChild(a);
                    var d = a.getContext("2d");
                    a.style.width = this.width + 4 + "px";
                    a.style.height = this.height + 4 + "px";
                    a.width = this.width + 4;
                    a.height = this.height + 4;
                    d.drawImage(this, 2, 2);
                    var g = d.getImageData(0, 0, a.width, a.height), c = g.data, b, e;
                    for (b = 2; b < a.width - 2; b++)
                        for (e = 0; 4 > e; e++)
                            c[4 * (b + a.width) + e] = c[4 * (b + 2 * a.width) + e],
                            c[4 * (b + a.width * (a.height - 2)) + e] = c[4 * (b + a.width * (a.height - 3)) + e];
                    for (b = 2; b < a.height - 2; b++)
                        for (e = 0; 4 > e; e++)
                            c[4 * (b * a.width + 1) + e] = c[4 * (b * a.width + 2) + e],
                            c[4 * ((b + 1) * a.width - 2) + e] = c[4 * ((b + 1) * a.width - 3) + e];
                    for (e = 0; 4 > e; e++)
                        c[4 * (a.width + 1) + e] = c[4 * (2 * a.width + 2) + e],
                        c[4 * (2 * a.width - 2) + e] = c[4 * (3 * a.width - 3) + e],
                        c[4 * (a.width * (a.height - 2) + 1) + e] = c[4 * (a.width * (a.height - 3) + 2) + e],
                        c[4 * (a.width * (a.height - 1) - 2) + e] = c[4 * (a.width * (a.height - 2) - 3) + e];
                    for (b = 1; b < a.width - 1; b++)
                        for (e = 0; 4 > e; e++)
                            c[4 * b + e] = c[4 * (b + a.width) + e],
                            c[4 * (b + a.width * (a.height - 1)) + e] = c[4 * (b + a.width * (a.height - 2)) + e];
                    for (b = 1; b < a.height - 1; b++)
                        for (e = 0; 4 > e; e++)
                            c[b * a.width * 4 + e] = c[4 * (b * a.width + 1) + e],
                            c[4 * ((b + 1) * a.width - 1) + e] = c[4 * ((b + 1) * a.width - 2) + e];
                    for (e = 0; 4 > e; e++)
                        c[e] = c[4 * (a.width + 1) + e],
                        c[4 * (a.width - 1) + e] = c[4 * (2 * a.width - 2) + e],
                        c[a.width * (a.height - 1) * 4 + e] = c[4 * (a.width * (a.height - 2) + 1) + e],
                        c[4 * (a.width * a.height - 1) + e] = c[4 * (a.width * (a.height - 1) - 2) + e];
                    d.putImageData(g, 0, 0);
                    C.call(this)
                }
                ;
                var C = function() {
                    0 < this.width ? ($ === p && ($ = this.width),
                    $ != this.width && console.log("Fallback faces have inconsistent widths: " + $ + " vs. " + this.width)) : F = !0;
                    R++;
                    6 == R && ($ = this.width,
                    Z.appendChild(S),
                    e())
                }
                  , F = !1;
                for (n = 0; 6 > n; n++)
                    g = new Image,
                    g.crossOrigin = qa.crossOrigin ? qa.crossOrigin : "anonymous",
                    g.side = n,
                    g.onload = k,
                    g.onerror = C,
                    g.src = "multires" == y ? L.replace("%s", M[n]) + "." + m.extension : m[n].src;
                z($)
            } else {
                if (!a)
                    throw console.log("Error: no WebGL support detected!"),
                    {
                        type: "no webgl"
                    };
                "cubemap" == y && z(x);
                m.fullpath = m.basePath ? m.basePath + m.path : m.path;
                m.invTileResolution = 1 / m.tileResolution;
                G = Ma();
                xa = [];
                for (n = 0; 6 > n; n++)
                    xa[n] = G.slice(12 * n, 12 * n + 12),
                    G = Ma();
                G = 0;
                if ("equirectangular" == y) {
                    if (G = a.getParameter(a.MAX_TEXTURE_SIZE),
                    Math.max(m.width / 2, m.height) > G)
                        throw console.log("Error: The image is too big; it's " + m.width + "px wide, but this device's maximum supported size is " + 2 * G + "px."),
                        {
                            type: "webgl size error",
                            width: m.width,
                            maxWidth: 2 * G
                        };
                } else if ("cubemap" == y && x > a.getParameter(a.MAX_CUBE_MAP_TEXTURE_SIZE))
                    throw console.log("Error: The image is too big; it's " + x + "px wide, but this device's maximum supported size is " + G + "px."),
                    {
                        type: "webgl size error",
                        width: x,
                        maxWidth: G
                    };
                s === p || s.horizonPitch === p && s.horizonRoll === p || (ea = [s.horizonPitch == p ? 0 : s.horizonPitch, s.horizonRoll == p ? 0 : s.horizonRoll]);
                x = a.TEXTURE_2D;
                a.viewport(0, 0, a.drawingBufferWidth, a.drawingBufferHeight);
                a.getShaderPrecisionFormat && (d = a.getShaderPrecisionFormat(a.FRAGMENT_SHADER, a.HIGH_FLOAT)) && 1 > d.precision && (ra = ra.replace("highp", "mediump"));
                U = a.createShader(a.VERTEX_SHADER);
                d = t;
                "multires" == y && (d = l);
                a.shaderSource(U, d);
                a.compileShader(U);
                V = a.createShader(a.FRAGMENT_SHADER);
                d = sa;
                "cubemap" == y ? (x = a.TEXTURE_CUBE_MAP,
                d = bb) : "multires" == y && (d = ta);
                a.shaderSource(V, d);
                a.compileShader(V);
                c = a.createProgram();
                a.attachShader(c, U);
                a.attachShader(c, V);
                a.linkProgram(c);
                a.getShaderParameter(U, a.COMPILE_STATUS) || console.log(a.getShaderInfoLog(U));
                a.getShaderParameter(V, a.COMPILE_STATUS) || console.log(a.getShaderInfoLog(V));
                a.getProgramParameter(c, a.LINK_STATUS) || console.log(a.getProgramInfoLog(c));
                a.useProgram(c);
                c.drawInProgress = !1;
                d = s.backgroundColor ? s.backgroundColor : [0, 0, 0];
                a.clearColor(d[0], d[1], d[2], 1);
                a.clear(a.COLOR_BUFFER_BIT);
                c.texCoordLocation = a.getAttribLocation(c, "a_texCoord");
                a.enableVertexAttribArray(c.texCoordLocation);
                "multires" != y ? (D || (D = a.createBuffer()),
                a.bindBuffer(a.ARRAY_BUFFER, D),
                a.bufferData(a.ARRAY_BUFFER, new Float32Array([-1, 1, 1, 1, 1, -1, -1, 1, 1, -1, -1, -1]), a.STATIC_DRAW),
                a.vertexAttribPointer(c.texCoordLocation, 2, a.FLOAT, !1, 0, 0),
                c.aspectRatio = a.getUniformLocation(c, "u_aspectRatio"),
                a.uniform1f(c.aspectRatio, a.drawingBufferWidth / a.drawingBufferHeight),
                c.psi = a.getUniformLocation(c, "u_psi"),
                c.theta = a.getUniformLocation(c, "u_theta"),
                c.f = a.getUniformLocation(c, "u_f"),
                c.h = a.getUniformLocation(c, "u_h"),
                c.v = a.getUniformLocation(c, "u_v"),
                c.vo = a.getUniformLocation(c, "u_vo"),
                c.rot = a.getUniformLocation(c, "u_rot"),
                a.uniform1f(c.h, L / (2 * Math.PI)),
                a.uniform1f(c.v, k / Math.PI),
                a.uniform1f(c.vo, g / Math.PI * 2),
                "equirectangular" == y && (c.backgroundColor = a.getUniformLocation(c, "u_backgroundColor"),
                a.uniform4fv(c.backgroundColor, d.concat([1]))),
                c.texture = a.createTexture(),
                a.bindTexture(x, c.texture),
                "cubemap" == y ? (a.texImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X, 0, a.RGB, a.RGB, a.UNSIGNED_BYTE, m[1]),
                a.texImage2D(a.TEXTURE_CUBE_MAP_NEGATIVE_X, 0, a.RGB, a.RGB, a.UNSIGNED_BYTE, m[3]),
                a.texImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_Y, 0, a.RGB, a.RGB, a.UNSIGNED_BYTE, m[4]),
                a.texImage2D(a.TEXTURE_CUBE_MAP_NEGATIVE_Y, 0, a.RGB, a.RGB, a.UNSIGNED_BYTE, m[5]),
                a.texImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_Z, 0, a.RGB, a.RGB, a.UNSIGNED_BYTE, m[0]),
                a.texImage2D(a.TEXTURE_CUBE_MAP_NEGATIVE_Z, 0, a.RGB, a.RGB, a.UNSIGNED_BYTE, m[2])) : m.width <= G ? (a.uniform1i(a.getUniformLocation(c, "u_splitImage"), 0),
                a.texImage2D(x, 0, a.RGB, a.RGB, a.UNSIGNED_BYTE, m)) : (a.uniform1i(a.getUniformLocation(c, "u_splitImage"), 1),
                L = f.createElement("canvas"),
                L.width = m.width,
                L.height = m.height,
                L = L.getContext("2d"),
                L.drawImage(m, 0, 0),
                k = L.getImageData(0, 0, m.width / 2, m.height),
                a.texImage2D(x, 0, a.RGB, a.RGB, a.UNSIGNED_BYTE, k),
                c.texture2 = a.createTexture(),
                a.activeTexture(a.TEXTURE1),
                a.bindTexture(x, c.texture2),
                a.uniform1i(a.getUniformLocation(c, "u_image1"), 1),
                k = L.getImageData(m.width / 2, 0, m.width / 2, m.height),
                a.texImage2D(x, 0, a.RGB, a.RGB, a.UNSIGNED_BYTE, k),
                a.texParameteri(x, a.TEXTURE_WRAP_S, a.CLAMP_TO_EDGE),
                a.texParameteri(x, a.TEXTURE_WRAP_T, a.CLAMP_TO_EDGE),
                a.texParameteri(x, a.TEXTURE_MIN_FILTER, a.LINEAR),
                a.texParameteri(x, a.TEXTURE_MAG_FILTER, a.LINEAR),
                a.activeTexture(a.TEXTURE0)),
                a.texParameteri(x, a.TEXTURE_WRAP_S, a.CLAMP_TO_EDGE),
                a.texParameteri(x, a.TEXTURE_WRAP_T, a.CLAMP_TO_EDGE),
                a.texParameteri(x, a.TEXTURE_MIN_FILTER, a.LINEAR),
                a.texParameteri(x, a.TEXTURE_MAG_FILTER, a.LINEAR)) : (c.vertPosLocation = a.getAttribLocation(c, "a_vertCoord"),
                a.enableVertexAttribArray(c.vertPosLocation),
                fa || (fa = a.createBuffer()),
                ya || (ya = a.createBuffer()),
                aa || (aa = a.createBuffer()),
                a.bindBuffer(a.ARRAY_BUFFER, ya),
                a.bufferData(a.ARRAY_BUFFER, new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]), a.STATIC_DRAW),
                a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, aa),
                a.bufferData(a.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), a.STATIC_DRAW),
                c.perspUniform = a.getUniformLocation(c, "u_perspMatrix"),
                c.cubeUniform = a.getUniformLocation(c, "u_cubeMatrix"),
                c.level = -1,
                c.currentNodes = [],
                c.nodeCache = [],
                c.nodeCacheTimestamp = 0);
                L = a.getError();
                if (0 !== L)
                    throw console.log("Error: Something went wrong with WebGL!", L),
                    {
                        type: "webgl error"
                    };
                e()
            }
        }
        ;
        this.destroy = function() {
            Z !== p && (E !== p && Z.contains(E) && Z.removeChild(E),
            S !== p && Z.contains(S) && Z.removeChild(S));
            if (a) {
                var c = a.getExtension("WEBGL_lose_context");
                c && c.loseContext()
            }
        }
        ;
        this.resize = function() {
            var f = F.devicePixelRatio || 1;
            E.width = E.clientWidth * f;
            E.height = E.clientHeight * f;
            a && (1286 == a.getError() && Ha(),
            a.viewport(0, 0, a.drawingBufferWidth, a.drawingBufferHeight),
            "multires" != y && a.uniform1f(c.aspectRatio, E.clientWidth / E.clientHeight))
        }
        ;
        this.resize();
        this.setPose = function(a, c) {
            ea = [a, c]
        }
        ;
        this.render = function(f, d, l, t) {
            var k, g = 0;
            t === p && (t = {});
            t.roll && (g = t.roll);
            if (ea !== p) {
                k = ea[0];
                var e = ea[1]
                  , s = f
                  , z = d
                  , n = Math.cos(e) * Math.sin(f) * Math.sin(k) + Math.cos(f) * (Math.cos(k) * Math.cos(d) + Math.sin(e) * Math.sin(k) * Math.sin(d))
                  , D = -Math.sin(f) * Math.sin(e) + Math.cos(f) * Math.cos(e) * Math.sin(d);
                f = Math.cos(e) * Math.cos(k) * Math.sin(f) + Math.cos(f) * (-Math.cos(d) * Math.sin(k) + Math.cos(k) * Math.sin(e) * Math.sin(d));
                f = Math.asin(Math.max(Math.min(f, 1), -1));
                d = Math.atan2(D, n);
                k = [Math.cos(s) * (Math.sin(e) * Math.sin(k) * Math.cos(z) - Math.cos(k) * Math.sin(z)), Math.cos(s) * Math.cos(e) * Math.cos(z), Math.cos(s) * (Math.cos(k) * Math.sin(e) * Math.cos(z) + Math.sin(z) * Math.sin(k))];
                e = [-Math.cos(f) * Math.sin(d), Math.cos(f) * Math.cos(d)];
                e = Math.acos(Math.max(Math.min((k[0] * e[0] + k[1] * e[1]) / (Math.sqrt(k[0] * k[0] + k[1] * k[1] + k[2] * k[2]) * Math.sqrt(e[0] * e[0] + e[1] * e[1])), 1), -1));
                0 > k[2] && (e = 2 * Math.PI - e);
                g += e
            }
            if (a || "multires" != y && "cubemap" != y) {
                if ("multires" != y)
                    l = 2 * Math.atan(Math.tan(0.5 * l) / (a.drawingBufferWidth / a.drawingBufferHeight)),
                    l = 1 / Math.tan(0.5 * l),
                    a.uniform1f(c.psi, d),
                    a.uniform1f(c.theta, f),
                    a.uniform1f(c.rot, g),
                    a.uniform1f(c.f, l),
                    !0 === ka && "equirectangular" == y && (a.bindTexture(a.TEXTURE_2D, c.texture),
                    a.texImage2D(a.TEXTURE_2D, 0, a.RGB, a.RGB, a.UNSIGNED_BYTE, m)),
                    a.drawArrays(a.TRIANGLES, 0, 6);
                else {
                    k = a.drawingBufferWidth / a.drawingBufferHeight;
                    e = 2 * Math.atan(Math.tan(l / 2) * a.drawingBufferHeight / a.drawingBufferWidth);
                    e = 1 / Math.tan(e / 2);
                    k = [e / k, 0, 0, 0, 0, e, 0, 0, 0, 0, 100.1 / -99.9, 20 / -99.9, 0, 0, -1, 0];
                    for (e = 1; e < m.maxLevel && a.drawingBufferWidth > m.tileResolution * Math.pow(2, e - 1) * Math.tan(l / 2) * 0.707; )
                        e++;
                    c.level = e;
                    e = [1, 0, 0, 0, 1, 0, 0, 0, 1];
                    e = pa(e, -g, "z");
                    e = pa(e, -f, "x");
                    e = pa(e, d, "y");
                    e = [e[0], e[1], e[2], 0, e[3], e[4], e[5], 0, e[6], e[7], e[8], 0, 0, 0, 0, 1];
                    a.uniformMatrix4fv(c.perspUniform, !1, new Float32Array(Ga(k)));
                    a.uniformMatrix4fv(c.cubeUniform, !1, new Float32Array(Ga(e)));
                    g = [k[0] * e[0], k[0] * e[1], k[0] * e[2], 0, k[5] * e[4], k[5] * e[5], k[5] * e[6], 0, k[10] * e[8], k[10] * e[9], k[10] * e[10], k[11], -e[8], -e[9], -e[10], 0];
                    c.nodeCache.sort(R);
                    if (200 < c.nodeCache.length && c.nodeCache.length > c.currentNodes.length + 50)
                        for (k = c.nodeCache.splice(200, c.nodeCache.length - 200),
                        e = 0; e < k.length; e++)
                            a.deleteTexture(k[e].texture);
                    c.currentNodes = [];
                    e = "fbudlr".split("");
                    for (k = 0; 6 > k; k++)
                        s = new M(xa[k],e[k],1,0,0,m.fullpath),
                        La(g, s, f, d, l);
                    c.currentNodes.sort(na);
                    for (f = ba.length - 1; 0 <= f; f--)
                        -1 === c.currentNodes.indexOf(ba[f].node) && (ba[f].node.textureLoad = !1,
                        ba.splice(f, 1));
                    if (0 === ba.length)
                        for (f = 0; f < c.currentNodes.length; f++)
                            if (d = c.currentNodes[f],
                            !d.texture && !d.textureLoad) {
                                d.textureLoad = !0;
                                setTimeout(wa, 0, d);
                                break
                            }
                    if (!c.drawInProgress) {
                        c.drawInProgress = !0;
                        a.clear(a.COLOR_BUFFER_BIT);
                        for (f = 0; f < c.currentNodes.length; f++)
                            1 < c.currentNodes[f].textureLoaded && (a.bindBuffer(a.ARRAY_BUFFER, fa),
                            a.bufferData(a.ARRAY_BUFFER, new Float32Array(c.currentNodes[f].vertices), a.STATIC_DRAW),
                            a.vertexAttribPointer(c.vertPosLocation, 3, a.FLOAT, !1, 0, 0),
                            a.bindBuffer(a.ARRAY_BUFFER, ya),
                            a.vertexAttribPointer(c.texCoordLocation, 2, a.FLOAT, !1, 0, 0),
                            a.bindTexture(a.TEXTURE_2D, c.currentNodes[f].texture),
                            a.drawElements(a.TRIANGLES, 6, a.UNSIGNED_SHORT, 0));
                        c.drawInProgress = !1
                    }
                }
                if (t.returnImage !== p)
                    return E.toDataURL("image/png")
            } else
                for (k = $ / 2,
                t = {
                    f: "translate3d(-" + (k + 2) + "px, -" + (k + 2) + "px, -" + k + "px)",
                    b: "translate3d(" + (k + 2) + "px, -" + (k + 2) + "px, " + k + "px) rotateX(180deg) rotateZ(180deg)",
                    u: "translate3d(-" + (k + 2) + "px, -" + k + "px, " + (k + 2) + "px) rotateX(270deg)",
                    d: "translate3d(-" + (k + 2) + "px, " + k + "px, -" + (k + 2) + "px) rotateX(90deg)",
                    l: "translate3d(-" + k + "px, -" + (k + 2) + "px, " + (k + 2) + "px) rotateX(180deg) rotateY(90deg) rotateZ(180deg)",
                    r: "translate3d(" + k + "px, -" + (k + 2) + "px, -" + (k + 2) + "px) rotateY(270deg)"
                },
                l = 1 / Math.tan(l / 2),
                l = l * E.clientWidth / 2 + "px",
                d = "perspective(" + l + ") translateZ(" + l + ") rotateX(" + f + "rad) rotateY(" + d + "rad) ",
                l = Object.keys(t),
                f = 0; 6 > f; f++)
                    if (g = S.querySelector(".pnlm-" + l[f] + "face"))
                        g.style.webkitTransform = d + t[l[f]],
                        g.style.transform = d + t[l[f]]
        }
        ;
        this.isLoading = function() {
            if (a && "multires" == y)
                for (var f = 0; f < c.currentNodes.length; f++)
                    if (!c.currentNodes[f].textureLoaded)
                        return !0;
            return !1
        }
        ;
        this.getCanvas = function() {
            return E
        }
        ;
        var ba = []
          , ja = function() {
            function c() {
                var e = this;
                this.texture = this.callback = null;
                this.image = new Image;
                this.image.crossOrigin = k ? k : "anonymous";
                var d = function() {
                    if (0 < e.image.width && 0 < e.image.height) {
                        var c = e.image;
                        a.bindTexture(a.TEXTURE_2D, e.texture);
                        a.texImage2D(a.TEXTURE_2D, 0, a.RGB, a.RGB, a.UNSIGNED_BYTE, c);
                        a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MAG_FILTER, a.LINEAR);
                        a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MIN_FILTER, a.LINEAR);
                        a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_S, a.CLAMP_TO_EDGE);
                        a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_T, a.CLAMP_TO_EDGE);
                        a.bindTexture(a.TEXTURE_2D, null);
                        e.callback(e.texture, !0)
                    } else
                        e.callback(e.texture, !1);
                    ba.length ? (c = ba.shift(),
                    e.loadTexture(c.src, c.texture, c.callback)) : l[f++] = e
                };
                this.image.addEventListener("load", d);
                this.image.addEventListener("error", d)
            }
            function d(a, c, d, f) {
                this.node = a;
                this.src = c;
                this.texture = d;
                this.callback = f
            }
            var f = 4, l = {}, k;
            c.prototype.loadTexture = function(a, c, d) {
                this.texture = c;
                this.callback = d;
                this.image.src = a
            }
            ;
            for (var g = 0; g < f; g++)
                l[g] = new c;
            return function(c, g, m, n) {
                k = n;
                n = a.createTexture();
                f ? l[--f].loadTexture(g, n, m) : ba.push(new d(c,g,n,m));
                return n
            }
        }()
    }
    var t = "attribute vec2 a_texCoord;varying vec2 v_texCoord;void main() {gl_Position = vec4(a_texCoord, 0.0, 1.0);v_texCoord = a_texCoord;}"
      , l = "attribute vec3 a_vertCoord;attribute vec2 a_texCoord;uniform mat4 u_cubeMatrix;uniform mat4 u_perspMatrix;varying mediump vec2 v_texCoord;void main(void) {gl_Position = u_perspMatrix * u_cubeMatrix * vec4(a_vertCoord, 1.0);v_texCoord = a_texCoord;}"
      , ra = "precision highp float;\nuniform float u_aspectRatio;\nuniform float u_psi;\nuniform float u_theta;\nuniform float u_f;\nuniform float u_h;\nuniform float u_v;\nuniform float u_vo;\nuniform float u_rot;\nconst float PI = 3.14159265358979323846264;\nuniform sampler2D u_image0;\nuniform sampler2D u_image1;\nuniform bool u_splitImage;\nuniform samplerCube u_imageCube;\nvarying vec2 v_texCoord;\nuniform vec4 u_backgroundColor;\nvoid main() {\nfloat x = v_texCoord.x * u_aspectRatio;\nfloat y = v_texCoord.y;\nfloat sinrot = sin(u_rot);\nfloat cosrot = cos(u_rot);\nfloat rot_x = x * cosrot - y * sinrot;\nfloat rot_y = x * sinrot + y * cosrot;\nfloat sintheta = sin(u_theta);\nfloat costheta = cos(u_theta);\nfloat a = u_f * costheta - rot_y * sintheta;\nfloat root = sqrt(rot_x * rot_x + a * a);\nfloat lambda = atan(rot_x / root, a / root) + u_psi;\nfloat phi = atan((rot_y * costheta + u_f * sintheta) / root);"
      , bb = ra + "float cosphi = cos(phi);\ngl_FragColor = textureCube(u_imageCube, vec3(cosphi*sin(lambda), sin(phi), cosphi*cos(lambda)));\n}"
      , sa = ra + "lambda = mod(lambda + PI, PI * 2.0) - PI;\nvec2 coord = vec2(lambda / PI, phi / (PI / 2.0));\nif(coord.x < -u_h || coord.x > u_h || coord.y < -u_v + u_vo || coord.y > u_v + u_vo)\ngl_FragColor = u_backgroundColor;\nelse {\nif(u_splitImage) {\nif(coord.x < 0.0)\ngl_FragColor = texture2D(u_image0, vec2((coord.x + u_h) / u_h, (-coord.y + u_v + u_vo) / (u_v * 2.0)));\nelse\ngl_FragColor = texture2D(u_image1, vec2((coord.x + u_h) / u_h - 1.0, (-coord.y + u_v + u_vo) / (u_v * 2.0)));\n} else {\ngl_FragColor = texture2D(u_image0, vec2((coord.x + u_h) / (u_h * 2.0), (-coord.y + u_v + u_vo) / (u_v * 2.0)));\n}\n}\n}"
      , ta = "varying mediump vec2 v_texCoord;uniform sampler2D u_sampler;void main(void) {gl_FragColor = texture2D(u_sampler, v_texCoord);}";
    return {
        renderer: function(f, l, p, t) {
            return new ja(f,l,p,t)
        }
    }
}(window, document);
window.pannellum = function(F, f, p) {
    function ja(t, l) {
        function ra(a) {
            F.removeEventListener("deviceorientation", ra);
            a && null !== a.alpha && null !== a.beta && null !== a.gamma ? (u.container.appendChild(u.orientation),
            ua = !0,
            Za && C()) : ua = !1
        }
        function ja() {
            var a = f.createElement("div");
            a.innerHTML = "\x3c!--[if lte IE 9]><i></i><![endif]--\x3e";
            if (1 == a.getElementsByTagName("i").length)
                R();
            else {
                za = b.hfov;
                Ia = b.pitch;
                var h;
                if ("cubemap" == b.type) {
                    Q = [];
                    for (a = 0; 6 > a; a++)
                        Q.push(new Image),
                        Q[a].crossOrigin = b.crossOrigin;
                    q.load.lbox.style.display = "block";
                    q.load.lbar.style.display = "none"
                } else if ("multires" == b.type)
                    a = JSON.parse(JSON.stringify(b.multiRes)),
                    b.basePath && b.multiRes.basePath && !/^(?:[a-z]+:)?\/\//i.test(b.multiRes.basePath) ? a.basePath = b.basePath + b.multiRes.basePath : b.multiRes.basePath ? a.basePath = b.multiRes.basePath : b.basePath && (a.basePath = b.basePath),
                    Q = a;
                else if (!0 === b.dynamic)
                    Q = b.panorama;
                else {
                    if (b.panorama === p) {
                        R(b.strings.noPanoramaError);
                        return
                    }
                    Q = new Image
                }
                if ("cubemap" == b.type)
                    for (var v = 6, c = function() {
                        v--;
                        0 === v && ta()
                    }, e = function(a) {
                        var ha = f.createElement("a");
                        ha.href = a.target.src;
                        ha.textContent = ha.href;
                        R(b.strings.fileAccessError.replace("%s", ha.outerHTML))
                    }, a = 0; a < Q.length; a++)
                        h = b.cubeMap[a],
                        "null" == h ? (console.log("Will use background instead of missing cubemap face " + a),
                        c()) : (b.basePath && !sa(h) && (h = b.basePath + h),
                        Q[a].onload = c,
                        Q[a].onerror = e,
                        Q[a].src = I(h));
                else if ("multires" == b.type)
                    ta();
                else if (h = "",
                b.basePath && (h = b.basePath),
                !0 !== b.dynamic) {
                    h = sa(b.panorama) ? b.panorama : h + b.panorama;
                    Q.onload = function() {
                        F.URL.revokeObjectURL(this.src);
                        ta()
                    }
                    ;
                    var d = new XMLHttpRequest;
                    d.onloadend = function() {
                        if (200 != d.status) {
                            var a = f.createElement("a");
                            a.href = h;
                            a.textContent = a.href;
                            R(b.strings.fileAccessError.replace("%s", a.outerHTML))
                        }
                        Z(this.response);
                        q.load.msg.innerHTML = ""
                    }
                    ;
                    d.onprogress = function(a) {
                        if (a.lengthComputable) {
                            q.load.lbarFill.style.width = a.loaded / a.total * 100 + "%";
                            var b, ha;
                            1E6 < a.total ? (b = "MB",
                            ha = (a.loaded / 1E6).toFixed(2),
                            a = (a.total / 1E6).toFixed(2)) : 1E3 < a.total ? (b = "kB",
                            ha = (a.loaded / 1E3).toFixed(1),
                            a = (a.total / 1E3).toFixed(1)) : (b = "B",
                            ha = a.loaded,
                            a = a.total);
                            q.load.msg.innerHTML = ha + " / " + a + " " + b
                        } else
                            q.load.lbox.style.display = "block",
                            q.load.lbar.style.display = "none"
                    }
                    ;
                    try {
                        d.open("GET", h, !0)
                    } catch (g) {
                        R(b.strings.malformedURLError)
                    }
                    d.responseType = "blob";
                    d.setRequestHeader("Accept", "image/*,*/*;q=0.9");
                    d.withCredentials = "use-credentials" === b.crossOrigin;
                    d.send()
                }
                b.draggable && J.classList.add("pnlm-grab");
                J.classList.remove("pnlm-grabbing");
                Na = !0 === b.dynamicUpdate;
                b.dynamic && Na && (Q = b.panorama,
                ta())
            }
        }
        function sa(a) {
            return /^(?:[a-z]+:)?\/\//i.test(a) || "/" == a[0] || "blob:" == a.slice(0, 5)
        }
        function ta() {
            B || (B = new libpannellum.renderer(N));
            Ta || (Ta = !0,
            W.addEventListener("mousedown", La, !1),
            f.addEventListener("mousemove", Ga, !1),
            f.addEventListener("mouseup", wa, !1),
            b.mouseZoom && (J.addEventListener("mousewheel", V, !1),
            J.addEventListener("DOMMouseScroll", V, !1)),
            b.doubleClickZoom && W.addEventListener("dblclick", Ma, !1),
            t.addEventListener("mozfullscreenchange", s, !1),
            t.addEventListener("webkitfullscreenchange", s, !1),
            t.addEventListener("msfullscreenchange", s, !1),
            t.addEventListener("fullscreenchange", s, !1),
            F.addEventListener("resize", ka, !1),
            F.addEventListener("orientationchange", ka, !1),
            b.disableKeyboardCtrl || (t.addEventListener("keydown", $, !1),
            t.addEventListener("keyup", xa, !1),
            t.addEventListener("blur", S, !1)),
            f.addEventListener("mouseleave", wa, !1),
            "" === f.documentElement.style.pointerAction && "" === f.documentElement.style.touchAction ? (W.addEventListener("pointerdown", c, !1),
            W.addEventListener("pointermove", a, !1),
            W.addEventListener("pointerup", U, !1),
            W.addEventListener("pointerleave", U, !1)) : (W.addEventListener("touchstart", oa, !1),
            W.addEventListener("touchmove", Ha, !1),
            W.addEventListener("touchend", E, !1)),
            F.navigator.pointerEnabled && (t.style.touchAction = "none"));
            ba();
            n(b.hfov);
            setTimeout(function() {}, 500)
        }
        function Z(a) {
            var h = new FileReader;
            h.addEventListener("loadend", function() {
                var v = h.result;
                if (navigator.userAgent.toLowerCase().match(/(iphone|ipod|ipad).* os 8_/)) {
                    var c = v.indexOf("\u00ff\u00c2");
                    (0 > c || 65536 < c) && R(b.strings.iOS8WebGLError)
                }
                c = v.indexOf("<x:xmpmeta");
                if (-1 < c && !0 !== b.ignoreGPanoXMP) {
                    var d = v.substring(c, v.indexOf("</x:xmpmeta>") + 12)
                      , e = function(a) {
                        var b;
                        0 <= d.indexOf(a + '="') ? (b = d.substring(d.indexOf(a + '="') + a.length + 2),
                        b = b.substring(0, b.indexOf('"'))) : 0 <= d.indexOf(a + ">") && (b = d.substring(d.indexOf(a + ">") + a.length + 1),
                        b = b.substring(0, b.indexOf("<")));
                        return b !== p ? Number(b) : null
                    }
                      , v = e("GPano:FullPanoWidthPixels")
                      , c = e("GPano:CroppedAreaImageWidthPixels")
                      , f = e("GPano:FullPanoHeightPixels")
                      , g = e("GPano:CroppedAreaImageHeightPixels")
                      , k = e("GPano:CroppedAreaTopPixels")
                      , l = e("GPano:PoseHeadingDegrees")
                      , m = e("GPano:PosePitchDegrees")
                      , e = e("GPano:PoseRollDegrees");
                    null !== v && null !== c && null !== f && null !== g && null !== k && (0 > ca.indexOf("haov") && (b.haov = c / v * 360),
                    0 > ca.indexOf("vaov") && (b.vaov = g / f * 180),
                    0 > ca.indexOf("vOffset") && (b.vOffset = -180 * ((k + g / 2) / f - 0.5)),
                    null !== l && 0 > ca.indexOf("northOffset") && (b.northOffset = l,
                    !1 !== b.compass && (b.compass = !0)),
                    null !== m && null !== e && (0 > ca.indexOf("horizonPitch") && (b.horizonPitch = m),
                    0 > ca.indexOf("horizonRoll") && (b.horizonRoll = e)))
                }
                Q.src = F.URL.createObjectURL(a)
            });
            h.readAsBinaryString !== p ? h.readAsBinaryString(a) : h.readAsText(a)
        }
        function R(a) {
            a === p && (a = b.strings.genericWebGLError);
            q.errorMsg.innerHTML = "<p>" + a + "</p>";
            u.load.style.display = "none";
            q.load.box.style.display = "none";
            q.errorMsg.style.display = "table";
            Oa = !0;
            N.style.display = "none";
            A("error", a)
        }
        function na(a) {
            var b = M(a);
            ia.style.left = b.x + "px";
            ia.style.top = b.y + "px";
            clearTimeout(na.t1);
            clearTimeout(na.t2);
            ia.style.display = "block";
            ia.style.opacity = 1;
            na.t1 = setTimeout(function() {
                ia.style.opacity = 0
            }, 2E3);
            na.t2 = setTimeout(function() {
                ia.style.display = "none"
            }, 2500);
            a.preventDefault()
        }
        function M(a) {
            var b = t.getBoundingClientRect()
              , v = {};
            v.x = (a.clientX || a.pageX) - b.left;
            v.y = (a.clientY || a.pageY) - b.top;
            return v
        }
        function La(a) {
            a.preventDefault();
            t.focus();
            if (K && b.draggable) {
                var h = M(a);
                if (b.hotSpotDebug) {
                    var v = pa(a);
                    console.log("Pitch: " + v[0] + ", Yaw: " + v[1] + ", Center Pitch: " + b.pitch + ", Center Yaw: " + b.yaw + ", HFOV: " + b.hfov)
                }
                Ea();
                Fa();
                b.roll = 0;
                w.hfov = 0;
                la = !0;
                O = Date.now();
                Aa = h.x;
                Ba = h.y;
                Pa = b.yaw;
                Qa = b.pitch;
                J.classList.add("pnlm-grabbing");
                J.classList.remove("pnlm-grab");
                A("mousedown", a);
                D()
            }
        }
        function Ma(a) {
            b.minHfov === b.hfov ? ga.setHfov(za, 1E3) : (a = pa(a),
            ga.lookAt(a[0], a[1], b.minHfov, 1E3))
        }
        function pa(a) {
            var h = M(a);
            a = B.getCanvas();
            var v = a.clientWidth
              , c = a.clientHeight;
            a = h.x / v * 2 - 1;
            var c = (1 - h.y / c * 2) * c / v
              , e = 1 / Math.tan(b.hfov * Math.PI / 360)
              , d = Math.sin(b.pitch * Math.PI / 180)
              , f = Math.cos(b.pitch * Math.PI / 180)
              , h = e * f - c * d
              , v = Math.sqrt(a * a + h * h)
              , c = 180 * Math.atan((c * f + e * d) / v) / Math.PI;
            a = 180 * Math.atan2(a / v, h / v) / Math.PI + b.yaw;
            -180 > a && (a += 360);
            180 < a && (a -= 360);
            return [c, a]
        }
        function Ga(a) {
            if (la && K) {
                O = Date.now();
                var h = B.getCanvas()
                  , v = h.clientWidth
                  , h = h.clientHeight;
                a = M(a);
                var c = 180 * (Math.atan(Aa / v * 2 - 1) - Math.atan(a.x / v * 2 - 1)) / Math.PI * b.hfov / 90 + Pa;
                w.yaw = (c - b.yaw) % 360 * 0.2;
                b.yaw = c;
                v = 360 * Math.atan(Math.tan(b.hfov / 360 * Math.PI) * h / v) / Math.PI;
                v = 180 * (Math.atan(a.y / h * 2 - 1) - Math.atan(Ba / h * 2 - 1)) / Math.PI * v / 90 + Qa;
                w.pitch = 0.2 * (v - b.pitch);
                b.pitch = v
            }
        }
        function wa(a) {
            la && (la = !1,
            15 < Date.now() - O && (w.pitch = w.yaw = 0),
            J.classList.add("pnlm-grab"),
            J.classList.remove("pnlm-grabbing"),
            O = Date.now(),
            A("mouseup", a))
        }
        function oa(a) {
            if (K && b.draggable) {
                Ea();
                Fa();
                b.roll = 0;
                w.hfov = 0;
                var h = M(a.targetTouches[0]);
                Aa = h.x;
                Ba = h.y;
                if (2 == a.targetTouches.length) {
                    var v = M(a.targetTouches[1]);
                    Aa += 0.5 * (v.x - h.x);
                    Ba += 0.5 * (v.y - h.y);
                    Ja = Math.sqrt((h.x - v.x) * (h.x - v.x) + (h.y - v.y) * (h.y - v.y))
                }
                la = !0;
                O = Date.now();
                Pa = b.yaw;
                Qa = b.pitch;
                A("touchstart", a);
                D()
            }
        }
        function Ha(a) {
            if (b.draggable && (a.preventDefault(),
            K && (O = Date.now()),
            la && K)) {
                var h = M(a.targetTouches[0])
                  , v = h.x
                  , c = h.y;
                2 == a.targetTouches.length && -1 != Ja && (a = M(a.targetTouches[1]),
                v += 0.5 * (a.x - h.x),
                c += 0.5 * (a.y - h.y),
                h = Math.sqrt((h.x - a.x) * (h.x - a.x) + (h.y - a.y) * (h.y - a.y)),
                n(b.hfov + 0.1 * (Ja - h)),
                Ja = h);
                h = b.hfov / 360 * b.touchPanSpeedCoeffFactor;
                v = (Aa - v) * h + Pa;
                w.yaw = (v - b.yaw) % 360 * 0.2;
                b.yaw = v;
                c = (c - Ba) * h + Qa;
                w.pitch = 0.2 * (c - b.pitch);
                b.pitch = c
            }
        }
        function E() {
            la = !1;
            150 < Date.now() - O && (w.pitch = w.yaw = 0);
            Ja = -1;
            O = Date.now();
            A("touchend", event)
        }
        function c(a) {
            "touch" == a.pointerType && (ma.push(a.pointerId),
            Ca.push({
                clientX: a.clientX,
                clientY: a.clientY
            }),
            a.targetTouches = Ca,
            oa(a),
            a.preventDefault())
        }
        function a(a) {
            if ("touch" == a.pointerType)
                for (var b = 0; b < ma.length; b++)
                    if (a.pointerId == ma[b]) {
                        Ca[b].clientX = a.clientX;
                        Ca[b].clientY = a.clientY;
                        a.targetTouches = Ca;
                        Ha(a);
                        a.preventDefault();
                        break
                    }
        }
        function U(a) {
            if ("touch" == a.pointerType) {
                for (var b = !1, c = 0; c < ma.length; c++)
                    a.pointerId == ma[c] && (ma[c] = p),
                    ma[c] && (b = !0);
                b || (ma = [],
                Ca = [],
                E());
                a.preventDefault()
            }
        }
        function V(a) {
            K && ("fullscreenonly" != b.mouseZoom || Da) && (a.preventDefault(),
            Ea(),
            O = Date.now(),
            a.wheelDeltaY ? (n(b.hfov - 0.05 * a.wheelDeltaY),
            w.hfov = 0 > a.wheelDelta ? 1 : -1) : a.wheelDelta ? (n(b.hfov - 0.05 * a.wheelDelta),
            w.hfov = 0 > a.wheelDelta ? 1 : -1) : a.detail && (n(b.hfov + 1.5 * a.detail),
            w.hfov = 0 < a.detail ? 1 : -1),
            D())
        }
        function $(a) {
            Ea();
            O = Date.now();
            Fa();
            b.roll = 0;
            var h = a.which || a.keycode;
            0 > b.capturedKeyNumbers.indexOf(h) || (a.preventDefault(),
            27 == h ? Da && e() : ea(h, !0))
        }
        function S() {
            for (var a = 0; 10 > a; a++)
                r[a] = !1
        }
        function xa(a) {
            var h = a.which || a.keycode;
            0 > b.capturedKeyNumbers.indexOf(h) || (a.preventDefault(),
            ea(h, !1))
        }
        function ea(a, b) {
            var c = !1;
            switch (a) {
            case 109:
            case 189:
            case 17:
            case 173:
                r[0] != b && (c = !0);
                r[0] = b;
                break;
            case 107:
            case 187:
            case 16:
            case 61:
                r[1] != b && (c = !0);
                r[1] = b;
                break;
            case 38:
                r[2] != b && (c = !0);
                r[2] = b;
                break;
            case 87:
                r[6] != b && (c = !0);
                r[6] = b;
                break;
            case 40:
                r[3] != b && (c = !0);
                r[3] = b;
                break;
            case 83:
                r[7] != b && (c = !0);
                r[7] = b;
                break;
            case 37:
                r[4] != b && (c = !0);
                r[4] = b;
                break;
            case 65:
                r[8] != b && (c = !0);
                r[8] = b;
                break;
            case 39:
                r[5] != b && (c = !0);
                r[5] = b;
                break;
            case 68:
                r[9] != b && (c = !0),
                r[9] = b
            }
            c && b && (da = "undefined" !== typeof performance && performance.now() ? performance.now() : Date.now(),
            D())
        }
        function m() {
            if (K) {
                var a = !1, h = b.pitch, c = b.yaw, e = b.hfov, d;
                d = "undefined" !== typeof performance && performance.now() ? performance.now() : Date.now();
                da === p && (da = d);
                var f = (d - da) * b.hfov / 1700
                  , f = Math.min(f, 1);
                r[0] && !0 === b.keyboardZoom && (n(b.hfov + (0.8 * w.hfov + 0.5) * f),
                a = !0);
                r[1] && !0 === b.keyboardZoom && (n(b.hfov + (0.8 * w.hfov - 0.2) * f),
                a = !0);
                if (r[2] || r[6])
                    b.pitch += (0.8 * w.pitch + 0.2) * f,
                    a = !0;
                if (r[3] || r[7])
                    b.pitch += (0.8 * w.pitch - 0.2) * f,
                    a = !0;
                if (r[4] || r[8])
                    b.yaw += (0.8 * w.yaw - 0.2) * f,
                    a = !0;
                if (r[5] || r[9])
                    b.yaw += (0.8 * w.yaw + 0.2) * f,
                    a = !0;
                a && (O = Date.now());
                if (b.autoRotate) {
                    if (0.001 < d - da) {
                        var a = (d - da) / 1E3
                          , g = (w.yaw / a * f - 0.2 * b.autoRotate) * a
                          , g = (0 < -b.autoRotate ? 1 : -1) * Math.min(Math.abs(b.autoRotate * a), Math.abs(g));
                        b.yaw += g
                    }
                    b.autoRotateStopDelay && (b.autoRotateStopDelay -= d - da,
                    0 >= b.autoRotateStopDelay && (b.autoRotateStopDelay = !1,
                    X = b.autoRotate,
                    b.autoRotate = 0))
                }
                P.pitch && (y("pitch"),
                h = b.pitch);
                P.yaw && (y("yaw"),
                c = b.yaw);
                P.hfov && (y("hfov"),
                e = b.hfov);
                0 < f && !b.autoRotate && (a = 1 - b.friction,
                r[4] || r[5] || r[8] || r[9] || P.yaw || (b.yaw += w.yaw * f * a),
                r[2] || r[3] || r[6] || r[7] || P.pitch || (b.pitch += w.pitch * f * a),
                r[0] || r[1] || P.hfov || n(b.hfov + w.hfov * f * a));
                da = d;
                0 < f && (w.yaw = 0.8 * w.yaw + (b.yaw - c) / f * 0.2,
                w.pitch = 0.8 * w.pitch + (b.pitch - h) / f * 0.2,
                w.hfov = 0.8 * w.hfov + (b.hfov - e) / f * 0.2,
                h = b.autoRotate ? Math.abs(b.autoRotate) : 5,
                w.yaw = Math.min(h, Math.max(w.yaw, -h)),
                w.pitch = Math.min(h, Math.max(w.pitch, -h)),
                w.hfov = Math.min(h, Math.max(w.hfov, -h)));
                r[0] && r[1] && (w.hfov = 0);
                (r[2] || r[6]) && (r[3] || r[7]) && (w.pitch = 0);
                (r[4] || r[8]) && (r[5] || r[9]) && (w.yaw = 0)
            }
        }
        function y(a) {
            var h = P[a]
              , c = Math.min(1, Math.max((Date.now() - h.startTime) / 1E3 / (h.duration / 1E3), 0))
              , c = h.startPosition + b.animationTimingFunction(c) * (h.endPosition - h.startPosition);
            if (h.endPosition > h.startPosition && c >= h.endPosition || h.endPosition < h.startPosition && c <= h.endPosition || h.endPosition === h.startPosition)
                c = h.endPosition,
                w[a] = 0,
                delete P[a];
            b[a] = c
        }
        function ka() {
            s("resize")
        }
        function D() {
            Ua || (Ua = !0,
            fa())
        }
        function fa() {
            ya();
            Va && clearTimeout(Va);
            if (la || !0 === Y)
                requestAnimationFrame(fa);
            else if (r[0] || r[1] || r[2] || r[3] || r[4] || r[5] || r[6] || r[7] || r[8] || r[9] || b.autoRotate || P.pitch || P.yaw || P.hfov || 0.01 < Math.abs(w.yaw) || 0.01 < Math.abs(w.pitch) || 0.01 < Math.abs(w.hfov))
                m(),
                0 <= b.autoRotateInactivityDelay && X && Date.now() - O > b.autoRotateInactivityDelay && !b.autoRotate && (b.autoRotate = X,
                ga.lookAt(Ia, p, za, 3E3)),
                requestAnimationFrame(fa);
            else if (B && (B.isLoading() || !0 === b.dynamic && Na))
                requestAnimationFrame(fa);
            else {
                A("animatefinished", {
                    pitch: ga.getPitch(),
                    yaw: ga.getYaw(),
                    hfov: ga.getHfov()
                });
                Ua = !1;
                da = p;
                var a = b.autoRotateInactivityDelay - (Date.now() - O);
                0 < a ? Va = setTimeout(function() {
                    b.autoRotate = X;
                    ga.lookAt(Ia, p, za, 3E3);
                    D()
                }, a) : 0 <= b.autoRotateInactivityDelay && X && (b.autoRotate = X,
                ga.lookAt(Ia, p, za, 3E3),
                D())
            }
        }
        function ya() {
            var a;
            if (K) {
                var h = B.getCanvas();
                a = b.yaw;
                var c = 0;
                if (b.avoidShowingBackground) {
                    var d = b.hfov / 2
                      , f = 180 * Math.atan2(Math.tan(d / 180 * Math.PI), h.width / h.height) / Math.PI;
                    b.vaov > b.haov ? Math.min(Math.cos((b.pitch - d) / 180 * Math.PI), Math.cos((b.pitch + d) / 180 * Math.PI)) : c = d * (1 - Math.min(Math.cos((b.pitch - f) / 180 * Math.PI), Math.cos((b.pitch + f) / 180 * Math.PI)))
                }
                var d = b.maxYaw - b.minYaw
                  , f = -180
                  , e = 180;
                360 > d && (f = b.minYaw + b.hfov / 2 + c,
                e = b.maxYaw - b.hfov / 2 - c,
                d < b.hfov && (f = e = (f + e) / 2),
                b.yaw = Math.max(f, Math.min(e, b.yaw)));
                180 < b.yaw ? b.yaw -= 360 : -180 > b.yaw && (b.yaw += 360);
                !1 !== b.autoRotate && a != b.yaw && da !== p && (b.autoRotate *= -1);
                a = 2 * Math.atan(Math.tan(b.hfov / 180 * Math.PI * 0.5) / (h.width / h.height)) / Math.PI * 180;
                h = b.minPitch + a / 2;
                c = b.maxPitch - a / 2;
                b.maxPitch - b.minPitch < a && (h = c = (h + c) / 2);
                isNaN(h) && (h = -90);
                isNaN(c) && (c = 90);
                b.pitch = Math.max(h, Math.min(c, b.pitch));
                B.render(b.pitch * Math.PI / 180, b.yaw * Math.PI / 180, b.hfov * Math.PI / 180, {
                    roll: b.roll * Math.PI / 180
                });
                b.hotSpots.forEach(L);
                b.compass && (Ka.style.transform = "rotate(" + (-b.yaw - b.northOffset) + "deg)",
                Ka.style.webkitTransform = "rotate(" + (-b.yaw - b.northOffset) + "deg)")
            }
        }
        function aa(a, b, c, d) {
            this.w = a;
            this.x = b;
            this.y = c;
            this.z = d
        }
        function qa(a) {
            var h;
            h = a.alpha;
            var c = a.beta;
            a = a.gamma;
            c = [c ? c * Math.PI / 180 / 2 : 0, a ? a * Math.PI / 180 / 2 : 0, h ? h * Math.PI / 180 / 2 : 0];
            h = [Math.cos(c[0]), Math.cos(c[1]), Math.cos(c[2])];
            c = [Math.sin(c[0]), Math.sin(c[1]), Math.sin(c[2])];
            h = new aa(h[0] * h[1] * h[2] - c[0] * c[1] * c[2],c[0] * h[1] * h[2] - h[0] * c[1] * c[2],h[0] * c[1] * h[2] + c[0] * h[1] * c[2],h[0] * h[1] * c[2] + c[0] * c[1] * h[2]);
            h = h.multiply(new aa(Math.sqrt(0.5),-Math.sqrt(0.5),0,0));
            c = F.orientation ? -F.orientation * Math.PI / 180 / 2 : 0;
            h = h.multiply(new aa(Math.cos(c),0,-Math.sin(c),0)).toEulerAngles();
            "number" == typeof Y && 10 > Y ? Y += 1 : 10 === Y ? ($a = h[2] / Math.PI * 180 + b.yaw,
            Y = !0,
            requestAnimationFrame(fa)) : (b.pitch = h[0] / Math.PI * 180,
            b.roll = -h[1] / Math.PI * 180,
            b.yaw = -h[2] / Math.PI * 180 + $a)
        }
        function ba() {
            try {
                var a = {};
                b.horizonPitch !== p && (a.horizonPitch = b.horizonPitch * Math.PI / 180);
                b.horizonRoll !== p && (a.horizonRoll = b.horizonRoll * Math.PI / 180);
                b.backgroundColor !== p && (a.backgroundColor = b.backgroundColor);
                B.init(Q, b.type, b.dynamic, b.haov * Math.PI / 180, b.vaov * Math.PI / 180, b.vOffset * Math.PI / 180, ab, a);
                !0 !== b.dynamic && (Q = p)
            } catch (c) {
                if ("webgl error" == c.type || "no webgl" == c.type)
                    R();
                else if ("webgl size error" == c.type)
                    R(b.strings.textureSizeError.replace("%s", c.width).replace("%s", c.maxWidth));
                else
                    throw R(b.strings.unknownError),
                    c;
            }
        }
        function ab() {
            if (b.sceneFadeDuration && B.fadeImg !== p) {
                B.fadeImg.style.opacity = 0;
                var a = B.fadeImg;
                delete B.fadeImg;
                setTimeout(function() {
                    N.removeChild(a);
                    A("scenechangefadedone")
                }, b.sceneFadeDuration)
            }
            Ka.style.display = b.compass ? "inline" : "none";
            d();
            q.load.box.style.display = "none";
            va !== p && (N.removeChild(va),
            va = p);
            K = !0;
            A("load");
            D()
        }
        function G(a) {
            a.pitch = Number(a.pitch) || 0;
            a.yaw = Number(a.yaw) || 0;
            var c = f.createElement("div");
            c.className = "pnlm-hotspot-base";
            c.className = a.cssClass ? c.className + (" " + a.cssClass) : c.className + (" pnlm-hotspot pnlm-sprite pnlm-" + H(a.type));
            var d = f.createElement("span");
            a.text && (d.innerHTML = H(a.text));
            var e;
            if (a.video) {
                e = f.createElement("video");
                var g = a.video;
                b.basePath && !sa(g) && (g = b.basePath + g);
                e.src = I(g);
                e.controls = !0;
                e.style.width = a.width + "px";
                N.appendChild(c);
                d.appendChild(e)
            } else if (a.image) {
                g = a.image;
                b.basePath && !sa(g) && (g = b.basePath + g);
                e = f.createElement("a");
                e.href = I(a.URL ? a.URL : g);
                e.target = "_blank";
                d.appendChild(e);
                var k = f.createElement("img");
                k.src = I(g);
                k.style.width = a.width + "px";
                k.style.paddingTop = "5px";
                N.appendChild(c);
                e.appendChild(k);
                d.style.maxWidth = "initial"
            } else if (a.URL) {
                e = f.createElement("a");
                e.href = I(a.URL);
                if (a.attributes)
                    for (g in a.attributes)
                        e.setAttribute(g, a.attributes[g]);
                else
                    e.target = "_blank";
                N.appendChild(e);
                c.className += " pnlm-pointer";
                d.className += " pnlm-pointer";
                e.appendChild(c)
            } else
                a.sceneId && (c.onclick = c.ontouchend = function() {
                    c.clicked || (c.clicked = !0,
                    Sa(a.sceneId, a.targetPitch, a.targetYaw, a.targetHfov));
                    return !1
                }
                ,
                c.className += " pnlm-pointer",
                d.className += " pnlm-pointer"),
                N.appendChild(c);
            if (a.createTooltipFunc)
                a.createTooltipFunc(c, a.createTooltipArgs);
            else if (a.text || a.video || a.image)
                c.classList.add("pnlm-tooltip"),
                c.appendChild(d),
                d.style.width = d.scrollWidth - 20 + "px",
                d.style.marginLeft = -(d.scrollWidth - c.offsetWidth) / 2 + "px",
                d.style.marginTop = -d.scrollHeight - 12 + "px";
            a.clickHandlerFunc && (c.addEventListener("click", function(b) {
                a.clickHandlerFunc(b, a.clickHandlerArgs)
            }, "false"),
            c.className += " pnlm-pointer",
            d.className += " pnlm-pointer");
            a.div = c
        }
        function d() {
            Wa || (b.hotSpots ? (b.hotSpots = b.hotSpots.sort(function(a, b) {
                return a.pitch < b.pitch
            }),
            b.hotSpots.forEach(G)) : b.hotSpots = [],
            Wa = !0,
            b.hotSpots.forEach(L))
        }
        function Ra() {
            var a = b.hotSpots;
            Wa = !1;
            delete b.hotSpots;
            if (a)
                for (var c = 0; c < a.length; c++) {
                    var d = a[c].div;
                    if (d) {
                        for (; d.parentNode && d.parentNode != N; )
                            d = d.parentNode;
                        N.removeChild(d)
                    }
                    delete a[c].div
                }
        }
        function L(a) {
            var c = Math.sin(a.pitch * Math.PI / 180)
              , d = Math.cos(a.pitch * Math.PI / 180)
              , e = Math.sin(b.pitch * Math.PI / 180)
              , f = Math.cos(b.pitch * Math.PI / 180)
              , g = Math.cos((-a.yaw + b.yaw) * Math.PI / 180)
              , k = c * e + d * g * f;
            if (90 >= a.yaw && -90 < a.yaw && 0 >= k || (90 < a.yaw || -90 >= a.yaw) && 0 >= k)
                a.div.style.visibility = "hidden";
            else {
                var l = Math.sin((-a.yaw + b.yaw) * Math.PI / 180)
                  , m = Math.tan(b.hfov * Math.PI / 360);
                a.div.style.visibility = "visible";
                var n = B.getCanvas()
                  , p = n.clientWidth
                  , n = n.clientHeight
                  , c = [-p / m * l * d / k / 2, -p / m * (c * f - d * g * e) / k / 2]
                  , d = Math.sin(b.roll * Math.PI / 180)
                  , e = Math.cos(b.roll * Math.PI / 180)
                  , c = [c[0] * e - c[1] * d, c[0] * d + c[1] * e];
                c[0] += (p - a.div.offsetWidth) / 2;
                c[1] += (n - a.div.offsetHeight) / 2;
                p = "translate(" + c[0] + "px, " + c[1] + "px) translateZ(9999px) rotate(" + b.roll + "deg)";
                a.div.style.webkitTransform = p;
                a.div.style.MozTransform = p;
                a.div.style.transform = p
            }
        }
        function k(a) {
            b = {};
            var c, d, e = "haov vaov vOffset northOffset horizonPitch horizonRoll".split(" ");
            ca = [];
            for (c in Xa)
                Xa.hasOwnProperty(c) && (b[c] = Xa[c]);
            for (c in l.default)
                if (l.default.hasOwnProperty(c))
                    if ("strings" == c)
                        for (d in l.default.strings)
                            l.default.strings.hasOwnProperty(d) && (b.strings[d] = H(l.default.strings[d]));
                    else
                        b[c] = l.default[c],
                        0 <= e.indexOf(c) && ca.push(c);
            if (null !== a && "" !== a && l.scenes && l.scenes[a]) {
                var f = l.scenes[a];
                for (c in f)
                    if (f.hasOwnProperty(c))
                        if ("strings" == c)
                            for (d in f.strings)
                                f.strings.hasOwnProperty(d) && (b.strings[d] = H(f.strings[d]));
                        else
                            b[c] = f[c],
                            0 <= e.indexOf(c) && ca.push(c);
                b.scene = a
            }
            for (c in l)
                if (l.hasOwnProperty(c))
                    if ("strings" == c)
                        for (d in l.strings)
                            l.strings.hasOwnProperty(d) && (b.strings[d] = H(l.strings[d]));
                    else
                        b[c] = l[c],
                        0 <= e.indexOf(c) && ca.push(c)
        }
        function g(a) {
            if ((a = a ? a : !1) && "preview"in b) {
                var c = b.preview;
                b.basePath && !sa(c) && (c = b.basePath + c);
                va = f.createElement("div");
                va.className = "pnlm-preview-img";
                va.style.backgroundImage = "url('" + I(c).replace(/"/g, "%22").replace(/'/g, "%27") + "')";
                N.appendChild(va)
            }
            var c = b.title
              , d = b.author;
            a && ("previewTitle"in b && (b.title = b.previewTitle),
            "previewAuthor"in b && (b.author = b.previewAuthor));
            b.hasOwnProperty("title") || (q.title.innerHTML = "");
            b.hasOwnProperty("author") || (q.author.innerHTML = "");
            b.hasOwnProperty("title") || b.hasOwnProperty("author") || (q.container.style.display = "none");
            u.load.innerHTML = "<p>" + b.strings.loadButtonLabel + "</p>";
            q.load.boxp.innerHTML = b.strings.loadingLabel;
            for (var e in b)
                if (b.hasOwnProperty(e))
                    switch (e) {
                    case "title":
                        q.title.innerHTML = H(b[e]);
                        q.container.style.display = "inline";
                        break;
                    case "author":
                        var g = H(b[e]);
                        b.authorURL && (g = f.createElement("a"),
                        g.href = I(b.authorURL),
                        g.target = "_blank",
                        g.innerHTML = H(b[e]),
                        g = g.outerHTML);
                        q.author.innerHTML = b.strings.bylineLabel.replace("%s", g);
                        q.container.style.display = "inline";
                        break;
                    case "fallback":
                        g = f.createElement("a");
                        g.href = I(b[e]);
                        g.target = "_blank";
                        g.textContent = "Click here to view this panorama in an alternative viewer.";
                        var k = f.createElement("p");
                        k.textContent = "Your browser does not support WebGL.";
                        k.appendChild(f.createElement("br"));
                        k.appendChild(g);
                        q.errorMsg.innerHTML = "";
                        q.errorMsg.appendChild(k);
                        break;
                    case "hfov":
                        n(Number(b[e]));
                        break;
                    case "autoLoad":
                        !0 === b[e] && B === p && (q.load.box.style.display = "inline",
                        u.load.style.display = "none",
                        ja());
                        break;
                    case "showZoomCtrl":
                        u.zoom.style.display = b[e] && !1 != b.showControls ? "block" : "none";
                        break;
                    case "showFullscreenCtrl":
                        u.fullscreen.style.display = b[e] && !1 != b.showControls && ("fullscreen"in f || "mozFullScreen"in f || "webkitIsFullScreen"in f || "msFullscreenElement"in f) ? "block" : "none";
                        break;
                    case "hotSpotDebug":
                        Ya.style.display = b[e] ? "block" : "none";
                        break;
                    case "showControls":
                        b[e] || (u.orientation.style.display = "none",
                        u.zoom.style.display = "none",
                        u.fullscreen.style.display = "none");
                        break;
                    case "orientationOnByDefault":
                        b[e] && (ua === p ? Za = !0 : !0 === ua && C())
                    }
            a && (c ? b.title = c : delete b.title,
            d ? b.author = d : delete b.author)
        }
        function e() {
            if (K && !Oa)
                if (Da)
                    f.exitFullscreen ? f.exitFullscreen() : f.mozCancelFullScreen ? f.mozCancelFullScreen() : f.webkitCancelFullScreen ? f.webkitCancelFullScreen() : f.msExitFullscreen && f.msExitFullscreen();
                else
                    try {
                        t.requestFullscreen ? t.requestFullscreen() : t.mozRequestFullScreen ? t.mozRequestFullScreen() : t.msRequestFullscreen ? t.msRequestFullscreen() : t.webkitRequestFullScreen()
                    } catch (a) {}
        }
        function s(a) {
            f.fullscreenElement || f.fullscreen || f.mozFullScreen || f.webkitIsFullScreen || f.msFullscreenElement ? (u.fullscreen.classList.add("pnlm-fullscreen-toggle-button-active"),
            Da = !0) : (u.fullscreen.classList.remove("pnlm-fullscreen-toggle-button-active"),
            Da = !1);
            "resize" !== a && A("fullscreenchange", Da);
            B.resize();
            n(b.hfov);
            D()
        }
        function z(a) {
            var c = b.minHfov;
            "multires" == b.type && B && b.multiResMinHfov && (c = Math.min(c, B.getCanvas().width / (b.multiRes.cubeResolution / 90 * 0.9)));
            if (c > b.maxHfov)
                return console.log("HFOV bounds do not make sense (minHfov > maxHfov)."),
                b.hfov;
            var d = b.hfov
              , d = a < c ? c : a > b.maxHfov ? b.maxHfov : a;
            b.avoidShowingBackground && B && (a = B.getCanvas(),
            d = Math.min(d, 360 * Math.atan(Math.tan((b.maxPitch - b.minPitch) / 360 * Math.PI) / a.height * a.width) / Math.PI));
            return d
        }
        function n(a) {
            b.hfov = z(a);
            A("zoomchange", b.hfov)
        }
        function Ea() {
            P = {};
            X = b.autoRotate ? b.autoRotate : X;
            b.autoRotate = !1
        }
        function x() {
            Oa && (q.load.box.style.display = "none",
            q.errorMsg.style.display = "none",
            Oa = !1,
            A("errorcleared"));
            K = !1;
            u.load.style.display = "none";
            q.load.box.style.display = "inline";
            ja()
        }
        function Sa(a, c, d, e, f) {
            K || (f = !0);
            K = !1;
            P = {};
            var m, n;
            if (b.sceneFadeDuration && !f && (m = B.render(b.pitch * Math.PI / 180, b.yaw * Math.PI / 180, b.hfov * Math.PI / 180, {
                returnImage: !0
            }),
            m !== p)) {
                f = new Image;
                f.className = "pnlm-fade-img";
                f.style.transition = "opacity " + b.sceneFadeDuration / 1E3 + "s";
                f.style.width = "100%";
                f.style.height = "100%";
                f.onload = function() {
                    Sa(a, c, d, e, !0)
                }
                ;
                f.src = m;
                N.appendChild(f);
                B.fadeImg = f;
                return
            }
            f = "same" === c ? b.pitch : c;
            m = "same" === d ? b.yaw : "sameAzimuth" === d ? b.yaw + (b.northOffset || 0) - (l.scenes[a].northOffset || 0) : d;
            n = "same" === e ? b.hfov : e;
            Ra();
            k(a);
            w.yaw = w.pitch = w.hfov = 0;
            g();
            f !== p && (b.pitch = f);
            m !== p && (b.yaw = m);
            n !== p && (b.hfov = n);
            A("scenechange", a);
            x()
        }
        function Fa() {
            F.removeEventListener("deviceorientation", qa);
            u.orientation.classList.remove("pnlm-orientation-button-active");
            Y = !1
        }
        function C() {
            Y = 1;
            F.addEventListener("deviceorientation", qa);
            u.orientation.classList.add("pnlm-orientation-button-active")
        }
        function H(a) {
            return l.escapeHTML ? String(a).split(/&/g).join("&amp;").split('"').join("&quot;").split("'").join("&#39;").split("<").join("&lt;").split(">").join("&gt;").split("/").join("&#x2f;").split("\n").join("<br>") : String(a).split("\n").join("<br>")
        }
        function I(a) {
            return 0 === a.trim().toLowerCase().indexOf("javascript:") ? "about:blank" : a
        }
        function A(a) {
            if (a in T)
                for (var b = T[a].length; 0 < b; b--)
                    T[a][T[a].length - b].apply(null, [].slice.call(arguments, 1))
        }
        var ga = this, b, B, va, la = !1, O = Date.now(), Aa = 0, Ba = 0, Ja = -1, Pa = 0, Qa = 0, r = Array(10), Da = !1, K, Oa = !1, Ta = !1, Q, da, w = {
            yaw: 0,
            pitch: 0,
            hfov: 0
        }, Ua = !1, Y = !1, $a = 0, Va, X = 0, za, Ia, P = {}, T = {}, ca = [], Na = !1, Wa = !1, Xa = {
            hfov: 100,
            minHfov: 50,
            multiResMinHfov: !1,
            maxHfov: 120,
            pitch: 0,
            minPitch: p,
            maxPitch: p,
            yaw: 0,
            minYaw: -180,
            maxYaw: 180,
            roll: 0,
            haov: 360,
            vaov: 180,
            vOffset: 0,
            autoRotate: !1,
            autoRotateInactivityDelay: -1,
            autoRotateStopDelay: p,
            type: "equirectangular",
            northOffset: 0,
            showFullscreenCtrl: !0,
            dynamic: !1,
            dynamicUpdate: !1,
            doubleClickZoom: !0,
            keyboardZoom: !0,
            mouseZoom: !0,
            showZoomCtrl: !0,
            autoLoad: !1,
            showControls: !0,
            orientationOnByDefault: !1,
            hotSpotDebug: !1,
            backgroundColor: [0, 0, 0],
            avoidShowingBackground: !1,
            animationTimingFunction: function(a) {
                return 0.5 > a ? 2 * a * a : -1 + (4 - 2 * a) * a
            },
            draggable: !0,
            disableKeyboardCtrl: !1,
            crossOrigin: "anonymous",
            touchPanSpeedCoeffFactor: 1,
            capturedKeyNumbers: [16, 17, 27, 37, 38, 39, 40, 61, 65, 68, 83, 87, 107, 109, 173, 187, 189],
            friction: 0.15,
            strings: {
                loadButtonLabel: "Click to<br>Load<br>Panorama",
                loadingLabel: "Loading...",
                bylineLabel: "by %s",
                noPanoramaError: "No panorama image was specified.",
                fileAccessError: "The file %s could not be accessed.",
                malformedURLError: "There is something wrong with the panorama URL.",
                iOS8WebGLError: "Due to iOS 8's broken WebGL implementation, only progressive encoded JPEGs work for your device (this panorama uses standard encoding).",
                genericWebGLError: "Your browser does not have the necessary WebGL support to display this panorama.",
                textureSizeError: "This panorama is too big for your device! It's %spx wide, but your device only supports images up to %spx wide. Try another device. (If you're the author, try scaling down the image.)",
                unknownError: "Unknown error. Check developer console."
            }
        };
        t = "string" === typeof t ? f.getElementById(t) : t;
        t.classList.add("pnlm-container");
        t.tabIndex = 0;
        var J = f.createElement("div");
        J.className = "pnlm-ui";
        t.appendChild(J);
        var N = f.createElement("div");
        N.className = "pnlm-render-container";
        t.appendChild(N);
        var W = f.createElement("div");
        W.className = "pnlm-dragfix";
        J.appendChild(W);
        var ia = f.createElement("span");
        ia.className = "pnlm-about-msg";        
        J.appendChild(ia);
        W.addEventListener("contextmenu", na);
        var q = {}
          , Ya = f.createElement("div");
        Ya.className = "pnlm-sprite pnlm-hot-spot-debug-indicator";
        J.appendChild(Ya);
        q.container = f.createElement("div");
        q.container.className = "pnlm-panorama-info";
        q.title = f.createElement("div");
        q.title.className = "pnlm-title-box";
        q.container.appendChild(q.title);
        q.author = f.createElement("div");
        q.author.className = "pnlm-author-box";
        q.container.appendChild(q.author);
        J.appendChild(q.container);
        q.load = {};
        q.load.box = f.createElement("div");
        q.load.box.className = "pnlm-load-box";
        q.load.boxp = f.createElement("p");
        q.load.box.appendChild(q.load.boxp);
        q.load.lbox = f.createElement("div");
        q.load.lbox.className = "pnlm-lbox";
        q.load.lbox.innerHTML = '<div class="pnlm-loading"></div>';
        q.load.box.appendChild(q.load.lbox);
        q.load.lbar = f.createElement("div");
        q.load.lbar.className = "pnlm-lbar";
        q.load.lbarFill = f.createElement("div");
        q.load.lbarFill.className = "pnlm-lbar-fill";
        q.load.lbar.appendChild(q.load.lbarFill);
        q.load.box.appendChild(q.load.lbar);
        q.load.msg = f.createElement("p");
        q.load.msg.className = "pnlm-lmsg";
        q.load.box.appendChild(q.load.msg);
        J.appendChild(q.load.box);
        q.errorMsg = f.createElement("div");
        q.errorMsg.className = "pnlm-error-msg pnlm-info-box";
        J.appendChild(q.errorMsg);
        var u = {};
        u.container = f.createElement("div");
        u.container.className = "pnlm-controls-container";
        J.appendChild(u.container);
        u.load = f.createElement("div");
        u.load.className = "pnlm-load-button";
        u.load.addEventListener("click", function() {
            g();
            x()
        });
        J.appendChild(u.load);
        u.zoom = f.createElement("div");
        u.zoom.className = "pnlm-zoom-controls pnlm-controls";
        u.zoomIn = f.createElement("div");
        u.zoomIn.className = "pnlm-zoom-in pnlm-sprite pnlm-control";
        u.zoomIn.addEventListener("click", function() {
            K && (n(b.hfov - 5),
            D())
        });
        u.zoom.appendChild(u.zoomIn);
        u.zoomOut = f.createElement("div");
        u.zoomOut.className = "pnlm-zoom-out pnlm-sprite pnlm-control";
        u.zoomOut.addEventListener("click", function() {
            K && (n(b.hfov + 5),
            D())
        });
        u.zoom.appendChild(u.zoomOut);
        u.container.appendChild(u.zoom);
        u.fullscreen = f.createElement("div");
        u.fullscreen.addEventListener("click", e);
        u.fullscreen.className = "pnlm-fullscreen-toggle-button pnlm-sprite pnlm-fullscreen-toggle-button-inactive pnlm-controls pnlm-control";
        (f.fullscreenEnabled || f.mozFullScreenEnabled || f.webkitFullscreenEnabled || f.msFullscreenEnabled) && u.container.appendChild(u.fullscreen);
        u.orientation = f.createElement("div");
        u.orientation.addEventListener("click", function(a) {
            Y ? Fa() : C()
        });
        u.orientation.addEventListener("mousedown", function(a) {
            a.stopPropagation()
        });
        u.orientation.addEventListener("touchstart", function(a) {
            a.stopPropagation()
        });
        u.orientation.addEventListener("pointerdown", function(a) {
            a.stopPropagation()
        });
        u.orientation.className = "pnlm-orientation-button pnlm-orientation-button-inactive pnlm-sprite pnlm-controls pnlm-control";
        var ua, Za = !1;
        F.DeviceOrientationEvent ? F.addEventListener("deviceorientation", ra) : ua = !1;
        var Ka = f.createElement("div");
        Ka.className = "pnlm-compass pnlm-controls pnlm-control";
        J.appendChild(Ka);
        l.firstScene ? k(l.firstScene) : l.default && l.default.firstScene ? k(l.default.firstScene) : k(null);
        g(!0);
        var ma = []
          , Ca = [];
        aa.prototype.multiply = function(a) {
            return new aa(this.w * a.w - this.x * a.x - this.y * a.y - this.z * a.z,this.x * a.w + this.w * a.x + this.y * a.z - this.z * a.y,this.y * a.w + this.w * a.y + this.z * a.x - this.x * a.z,this.z * a.w + this.w * a.z + this.x * a.y - this.y * a.x)
        }
        ;
        aa.prototype.toEulerAngles = function() {
            var a = Math.atan2(2 * (this.w * this.x + this.y * this.z), 1 - 2 * (this.x * this.x + this.y * this.y))
              , b = Math.asin(2 * (this.w * this.y - this.z * this.x))
              , c = Math.atan2(2 * (this.w * this.z + this.x * this.y), 1 - 2 * (this.y * this.y + this.z * this.z));
            return [a, b, c]
        }
        ;
        this.isLoaded = function() {
            return Boolean(K)
        }
        ;
        this.getPitch = function() {
            return b.pitch
        }
        ;
        this.setPitch = function(a, c, d, e) {
            O = Date.now();
            if (1E-6 >= Math.abs(a - b.pitch))
                return "function" == typeof d && d(e),
                this;
            (c = c == p ? 1E3 : Number(c)) ? (P.pitch = {
                startTime: Date.now(),
                startPosition: b.pitch,
                endPosition: a,
                duration: c
            },
            "function" == typeof d && setTimeout(function() {
                d(e)
            }, c)) : b.pitch = a;
            D();
            return this
        }
        ;
        this.getPitchBounds = function() {
            return [b.minPitch, b.maxPitch]
        }
        ;
        this.setPitchBounds = function(a) {
            b.minPitch = Math.max(-90, Math.min(a[0], 90));
            b.maxPitch = Math.max(-90, Math.min(a[1], 90));
            return this
        }
        ;
        this.getYaw = function() {
            return b.yaw
        }
        ;
        this.setYaw = function(a, c, d, e) {
            O = Date.now();
            if (1E-6 >= Math.abs(a - b.yaw))
                return "function" == typeof d && d(e),
                this;
            c = c == p ? 1E3 : Number(c);
            a = (a + 180) % 360 - 180;
            c ? (180 < b.yaw - a ? a += 360 : 180 < a - b.yaw && (a -= 360),
            P.yaw = {
                startTime: Date.now(),
                startPosition: b.yaw,
                endPosition: a,
                duration: c
            },
            "function" == typeof d && setTimeout(function() {
                d(e)
            }, c)) : b.yaw = a;
            D();
            return this
        }
        ;
        this.getYawBounds = function() {
            return [b.minYaw, b.maxYaw]
        }
        ;
        this.setYawBounds = function(a) {
            b.minYaw = Math.max(-180, Math.min(a[0], 180));
            b.maxYaw = Math.max(-180, Math.min(a[1], 180));
            return this
        }
        ;
        this.getHfov = function() {
            return b.hfov
        }
        ;
        this.setHfov = function(a, c, d, e) {
            O = Date.now();
            if (1E-6 >= Math.abs(a - b.hfov))
                return "function" == typeof d && d(e),
                this;
            (c = c == p ? 1E3 : Number(c)) ? (P.hfov = {
                startTime: Date.now(),
                startPosition: b.hfov,
                endPosition: z(a),
                duration: c
            },
            "function" == typeof d && setTimeout(function() {
                d(e)
            }, c)) : n(a);
            D();
            return this
        }
        ;
        this.getHfovBounds = function() {
            return [b.minHfov, b.maxHfov]
        }
        ;
        this.setHfovBounds = function(a) {
            b.minHfov = Math.max(0, a[0]);
            b.maxHfov = Math.max(0, a[1]);
            return this
        }
        ;
        this.lookAt = function(a, c, d, e, f, g) {
            e = e == p ? 1E3 : Number(e);
            a !== p && 1E-6 < Math.abs(a - b.pitch) && (this.setPitch(a, e, f, g),
            f = p);
            c !== p && 1E-6 < Math.abs(c - b.yaw) && (this.setYaw(c, e, f, g),
            f = p);
            d !== p && 1E-6 < Math.abs(d - b.hfov) && (this.setHfov(d, e, f, g),
            f = p);
            "function" == typeof f && f(g);
            return this
        }
        ;
        this.getNorthOffset = function() {
            return b.northOffset
        }
        ;
        this.setNorthOffset = function(a) {
            b.northOffset = Math.min(360, Math.max(0, a));
            D();
            return this
        }
        ;
        this.getHorizonRoll = function() {
            return b.horizonRoll
        }
        ;
        this.setHorizonRoll = function(a) {
            b.horizonRoll = Math.min(90, Math.max(-90, a));
            B.setPose(b.horizonPitch * Math.PI / 180, b.horizonRoll * Math.PI / 180);
            D();
            return this
        }
        ;
        this.getHorizonPitch = function() {
            return b.horizonPitch
        }
        ;
        this.setHorizonPitch = function(a) {
            b.horizonPitch = Math.min(90, Math.max(-90, a));
            B.setPose(b.horizonPitch * Math.PI / 180, b.horizonRoll * Math.PI / 180);
            D();
            return this
        }
        ;
        this.startAutoRotate = function(a) {
            a = a || X || 1;
            b.autoRotate = a;
            ga.lookAt(Ia, p, za, 3E3);
            D();
            return this
        }
        ;
        this.stopAutoRotate = function() {
            X = b.autoRotate ? b.autoRotate : X;
            b.autoRotate = !1;
            b.autoRotateInactivityDelay = -1;
            return this
        }
        ;
        this.stopMovement = function() {
            Ea();
            w = {
                yaw: 0,
                pitch: 0,
                hfov: 0
            }
        }
        ;
        this.getRenderer = function() {
            return B
        }
        ;
        this.setUpdate = function(a) {
            Na = !0 === a;
            B === p ? ta() : D();
            return this
        }
        ;
        this.mouseEventToCoords = function(a) {
            return pa(a)
        }
        ;
        this.loadScene = function(a, b, c, d) {
            !1 !== K && Sa(a, b, c, d);
            return this
        }
        ;
        this.getScene = function() {
            return b.scene
        }
        ;
        this.addScene = function(a, b) {
            l.scenes[a] = b;
            return this
        }
        ;
        this.removeScene = function(a) {
            if (b.scene === a || !l.scenes.hasOwnProperty(a))
                return !1;
            delete l.scenes[a];
            return !0
        }
        ;
        this.toggleFullscreen = function() {
            e();
            return this
        }
        ;
        this.getConfig = function() {
            return b
        }
        ;
        this.getContainer = function() {
            return t
        }
        ;
        this.addHotSpot = function(a, c) {
            if (c === p && b.scene === p)
                b.hotSpots.push(a);
            else {
                var d = c !== p ? c : b.scene;
                if (l.scenes.hasOwnProperty(d))
                    l.scenes[d].hasOwnProperty("hotSpots") || (l.scenes[d].hotSpots = [],
                    d == b.scene && (b.hotSpots = l.scenes[d].hotSpots)),
                    l.scenes[d].hotSpots.push(a);
                else
                    throw "Invalid scene ID!";
            }
            if (c === p || b.scene == c)
                G(a),
                K && L(a);
            return this
        }
        ;
        this.removeHotSpot = function(a, c) {
            if (c === p || b.scene == c) {
                if (!b.hotSpots)
                    return !1;
                for (var d = 0; d < b.hotSpots.length; d++)
                    if (b.hotSpots[d].hasOwnProperty("id") && b.hotSpots[d].id === a) {
                        for (var e = b.hotSpots[d].div; e.parentNode != N; )
                            e = e.parentNode;
                        N.removeChild(e);
                        delete b.hotSpots[d].div;
                        b.hotSpots.splice(d, 1);
                        return !0
                    }
            } else if (l.scenes.hasOwnProperty(c)) {
                if (!l.scenes[c].hasOwnProperty("hotSpots"))
                    return !1;
                for (d = 0; d < l.scenes[c].hotSpots.length; d++)
                    if (l.scenes[c].hotSpots[d].hasOwnProperty("id") && l.scenes[c].hotSpots[d].id === a)
                        return l.scenes[c].hotSpots.splice(d, 1),
                        !0
            } else
                return !1
        }
        ;
        this.resize = function() {
            B && ka()
        }
        ;
        this.isLoaded = function() {
            return K
        }
        ;
        this.isOrientationSupported = function() {
            return ua || !1
        }
        ;
        this.stopOrientation = function() {
            Fa()
        }
        ;
        this.startOrientation = function() {
            ua && C()
        }
        ;
        this.isOrientationActive = function() {
            return Boolean(Y)
        }
        ;
        this.on = function(a, b) {
            T[a] = T[a] || [];
            T[a].push(b);
            return this
        }
        ;
        this.off = function(a, b) {
            if (!a)
                return T = {},
                this;
            if (b) {
                var c = T[a].indexOf(b);
                0 <= c && T[a].splice(c, 1);
                0 == T[a].length && delete T[a]
            } else
                delete T[a];
            return this
        }
        ;
        this.destroy = function() {
            B && B.destroy();
            Ta && (f.removeEventListener("mousemove", Ga, !1),
            f.removeEventListener("mouseup", wa, !1),
            t.removeEventListener("mozfullscreenchange", s, !1),
            t.removeEventListener("webkitfullscreenchange", s, !1),
            t.removeEventListener("msfullscreenchange", s, !1),
            t.removeEventListener("fullscreenchange", s, !1),
            F.removeEventListener("resize", ka, !1),
            F.removeEventListener("orientationchange", ka, !1),
            t.removeEventListener("keydown", $, !1),
            t.removeEventListener("keyup", xa, !1),
            t.removeEventListener("blur", S, !1),
            f.removeEventListener("mouseleave", wa, !1));
            t.innerHTML = "";
            t.classList.remove("pnlm-container")
        }
    }
    return {
        viewer: function(f, l) {
            return new ja(f,l)
        }
    }
}(window, document);
