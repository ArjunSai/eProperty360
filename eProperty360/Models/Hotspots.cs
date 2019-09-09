using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace eProperty360.Models
{
    public class Hotspots
    {
        public string Pitch { get; set; }
        public string Yaw { get; set; }
        public string Text { get; set; }
        public string HotspotSceneId { get; set; }

        public string HotspotSceneUrl { get; set; }
    }
}