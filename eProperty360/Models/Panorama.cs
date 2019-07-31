using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace eProperty360.Models
{
    public class Panorama
    {
       public string FirstScene { get; set; }
       public string Author { get; set; }
       public List<Scenes> lstScenes { get; set; }        
    }
}