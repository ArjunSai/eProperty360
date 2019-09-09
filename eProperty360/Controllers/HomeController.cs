using eProperty360.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace eProperty360.Controllers
{
    public class HomeController : Controller
    {
       public static List<SceneHotSpots> lstSceneHotSpots = null;
        public ActionResult Index()
        {           
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        public ActionResult StichImage()
        {
            lstSceneHotSpots=new List<SceneHotSpots>();
            ViewBag.Message = "Stich Image";
            ViewBag.ImgLst = CreateImageDD();
            return View();
        }

        public List<SelectListItem> CreateImageDD()
        {
            string imagePath = System.AppDomain.CurrentDomain.BaseDirectory + "Images\\MansionVijith";

            string[] filePaths = Directory.GetFiles(imagePath);
            
            SelectListItem select = null;
            List<SelectListItem> lstSelect = new List<SelectListItem>();
            foreach (var item in filePaths)
            {
                select= new SelectListItem();
                select.Text = Path.GetFileName(item);
                select.Value = "./Images/MansionVijith/" + select.Text;
                lstSelect.Add(select);
            }
            return lstSelect;
        }

        public ActionResult GetImageHtml(string ImageName,string ImageUrl) {
            ViewBag.ImageUrl = ImageUrl;
            return PartialView("_combineImages");
        }

        public void MappImage(SceneHotSpots SceneHotSpotobj)
        {
            lstSceneHotSpots.Add(SceneHotSpotobj);            
        }


        public string GetPreviewHtml(SceneHotSpots SceneHotSpotobj)
        {
            List<string> lstScenes = new List<string>();
            lstScenes.Add(SceneHotSpotobj.SceneId);
            List<SceneHotSpots> lstPreview = new List<SceneHotSpots>();
            lstPreview.Add(SceneHotSpotobj);

            string output = ConstructFinalTemplate(ConstructObject(lstScenes,".", lstPreview));
            return output;
          //  DownloadFile(output);
        }
        public string GetFinalHtml()
        {
            List<string> lstScenes=lstSceneHotSpots.Select(x=>x.SceneId).Distinct().ToList();

           string output= ConstructFinalTemplate(ConstructObject(lstScenes,".", lstSceneHotSpots));
            return output;
            //DownloadFile(output);
        }

        public Panorama ConstructObject(List<string> lstScenes,string previewStr, List<SceneHotSpots> lstSceneHotSpotsFinal)
        {
            Panorama objPanorama = new Panorama();
            objPanorama.lstScenes = new List<Scenes>();
            objPanorama.FirstScene = lstScenes.FirstOrDefault();
            foreach (string itemSceneId in lstScenes)
            {
                List<SceneHotSpots> lst = lstSceneHotSpotsFinal.Where(x => x.SceneId == itemSceneId).ToList();
                Scenes objScene = new Scenes();
                objScene.SceneId = itemSceneId;
                objScene.friction = 0.60f;
                objScene.HotSpotList = new List<Hotspots>();
                foreach (SceneHotSpots item in lst)
                {
                    Hotspots objHotSpot = new Hotspots();
                    objScene.SceneUrl = previewStr+item.SceneUrl;
                    objHotSpot.HotspotSceneId = item.HotspotSceneId;
                    objHotSpot.Pitch = item.HotspotPitch;
                    objHotSpot.Yaw = item.HotspotYaw;
                    objHotSpot.HotspotSceneUrl = previewStr + item.HotspotSceneUrl;
                    objScene.HotSpotList.Add(objHotSpot);
                }
                objPanorama.lstScenes.Add(objScene);
            }
            List<SelectListItem> ddlImages = CreateImageDD();
            List<string> unUsedUmages= ddlImages.Select(x=>x.Text).Except(lstScenes).ToList();
            foreach (var item in unUsedUmages)
            {
                Scenes objScene = new Scenes();
                objScene.SceneId = item;
                objScene.SceneUrl= previewStr + ddlImages.FirstOrDefault(x => x.Text == item).Value;
                objScene.friction = 0.60f;
                objScene.HotSpotList = new List<Hotspots>();
                objPanorama.lstScenes.Add(objScene);
            }
            return objPanorama;
        }

        public string ConstructFinalTemplate(Panorama mainObj)
        {
            List<string> imageList = new List<string>();
            string basePath = System.AppDomain.CurrentDomain.BaseDirectory + "Content";
            string defaultTemplate=System.IO.File.ReadAllText(basePath + "\\Default.txt");
            string SceneTemplate = System.IO.File.ReadAllText(basePath + "\\SceneTemplate.txt");
            string hotSpotTemplate = System.IO.File.ReadAllText(basePath + "\\HotSpotTemplate.txt");
            string MainTemplate = System.IO.File.ReadAllText(basePath + "\\MainTemplate.txt");

            StringBuilder strMainNode = new StringBuilder();
            strMainNode.AppendLine(MainTemplate);
            #region Default Node
            StringBuilder strDefaultNode = new StringBuilder();
            strDefaultNode.AppendLine(defaultTemplate);
            strDefaultNode.Replace("$FirstScene", mainObj.FirstScene);
            strDefaultNode.Replace("$Author", mainObj.Author);

            string defaultPreLoadImages = ConstructCasesForHotSpots("", "", mainObj.lstScenes.FirstOrDefault(x => x.SceneId.Equals(mainObj.FirstScene)).HotSpotList, isDefault: true);
            #endregion
            #region Scene Node
            StringBuilder strSceneNode = new StringBuilder();
            strSceneNode.AppendLine(SceneTemplate);
            string caseString = string.Empty;
            foreach (var item in mainObj.lstScenes)
            {
                imageList.Add(item.SceneUrl);
                strSceneNode.Replace("$SceneId",item.SceneId);
                strSceneNode.Replace("$SceneUrl",item.SceneUrl);
                strSceneNode.Replace("$friction", item.friction.ToString());
                #region Hotspot Node
                StringBuilder strHotSpot = new StringBuilder();
                if(item.HotSpotList.Any())
                {
                    strHotSpot.AppendLine(hotSpotTemplate);
                }                
                foreach (var itemHotspot in item.HotSpotList)
                {
                    strHotSpot.Replace("$Pitch",Convert.ToString(Math.Floor(Convert.ToDecimal(itemHotspot.Pitch))));
                    strHotSpot.Replace("$Yaw", Convert.ToString(Math.Floor(Convert.ToDecimal(itemHotspot.Yaw))));
                    strHotSpot.Replace("$HotspotSceneId", itemHotspot.HotspotSceneId);
                    if (item.HotSpotList.LastOrDefault()!=itemHotspot)
                    {
                        strHotSpot.AppendLine("," + hotSpotTemplate);
                    }                    
                }
                  strSceneNode.Replace("$HotSpotList", strHotSpot.ToString());
                    
                #endregion
                if (mainObj.lstScenes.LastOrDefault()!=item)
                {
                    strSceneNode.AppendLine(","+SceneTemplate);
                }

                caseString = caseString + ConstructCasesForHotSpots(caseString, item.SceneId, item.HotSpotList);
            }
            #endregion

            #region AutoLoad Images
            StringBuilder arrImage = new StringBuilder();
            arrImage.AppendLine("[");
            foreach (var imageItem in imageList)
            {
                arrImage.AppendLine("\"" + imageItem + "\",");
            }
            arrImage.AppendLine("];");
            #endregion

            strMainNode.Replace("$default", strDefaultNode.ToString());
            strMainNode.Replace("$SceneList", strSceneNode.ToString());
            strMainNode.Replace("$ArrayImages", arrImage.ToString());
            strMainNode.Replace("$defHotspotUrls", defaultPreLoadImages);
            strMainNode.Replace("$sceneHotSpotUrls", caseString);

            return strMainNode.ToString();

        }

        public void DownloadFile(string output)
        {
            MemoryStream ms = new MemoryStream();
            TextWriter tw = new StreamWriter(ms);
            tw.WriteLine(output);
            tw.Flush();
            byte[] bytes = ms.ToArray();
            ms.Close();

            Response.Clear();
            Response.ContentType = "application/force-download";
            Response.AddHeader("content-disposition", "attachment;    filename=Output.cshtml");
            Response.BinaryWrite(bytes);
            Response.End();
        }

        public string ConstructCasesForHotSpots(string strToAppend,string sceneId,List<Hotspots> hotSpotUrl,bool isDefault=false)
        {
            StringBuilder caseBuilder = new StringBuilder();
            if(!isDefault)
            caseBuilder.AppendLine("case \"" + sceneId + "\":");
            foreach (var item in hotSpotUrl)
            {
                caseBuilder.AppendLine("preload(\"" + item.HotspotSceneUrl + "\");");
            }
            caseBuilder.AppendLine("break;");    
            return caseBuilder.ToString();
        }
    }
}