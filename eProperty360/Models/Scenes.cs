using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace eProperty360.Models
{
    public class Scenes
    {
        public string SceneId { get; set; }
        public List<Hotspots> HotSpotList { get; set; }
        public string Title { get; set; }
        public string SceneUrl { get; set; }
        public bool IsDefault { get; set; }
    }
}