using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace eProperty360.Models
{
    public class SceneHotSpots
    {
        public string SceneId { get; set; }
        public string HotspotSceneId { get; set; }
        public string HotspotSceneUrl { get; set; }
        public string HotspotTitle { get; set; }
        public string HotspotYaw { get; set; }
        public string HotspotPitch { get; set; }

        public string SceneUrl { get; set; }
    }
}