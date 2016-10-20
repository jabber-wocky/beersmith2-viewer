<?xml version="1.0" encoding="iso-8859-1"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:param name="folder"/>
    <xsl:param name="recipe"/>
    
    <xsl:template match="/">
        <xsl:for-each select="//Recipe[boolean(./F_R_NAME) and ./F_R_NAME = $recipe and ../../Name = $folder]">
            <xsl:sort select="F_R_NAME" />

            <div class="recipe">
                <a class="anchor">
                    <xsl:attribute name="name">
                        <xsl:value-of select="F_R_NAME" />
                    </xsl:attribute>
                </a>
                <h2>
                    <xsl:value-of select="F_R_NAME" />
                </h2>
				<div style="display:none">
					!@#var calc = { 'grains' : [{ 'color' : 0, 'weight' : 0, 'volume' : <xsl:value-of select="./F_R_EQUIPMENT/F_E_BATCH_VOL*0.0078125"/>, 'yield': 0, 'ee' : 0, 'fg': <xsl:value-of select="(F_R_STYLE/F_S_MAX_FG + F_R_STYLE/F_S_MIN_FG) div 2" /> }<xsl:for-each select="./Ingredients/Data/Grain">,{ 'color' : <xsl:value-of select="./F_G_COLOR"/>, 'weight' : <xsl:value-of select="./F_G_AMOUNT*0.062500"/>, 'volume' : <xsl:value-of select="./../../../F_R_EQUIPMENT/F_E_BATCH_VOL*0.0078125"/>,'yield' : <xsl:value-of select="./F_G_YIELD"/>, 'ee' : <xsl:choose><xsl:when test="F_G_TYPE = 0"><xsl:value-of select="round(./../../../F_R_EQUIPMENT/F_E_EFFICIENCY*100) div 10000" /></xsl:when><xsl:otherwise>1</xsl:otherwise></xsl:choose>, 'fg': <xsl:value-of select="(./../../../F_R_STYLE/F_S_MAX_FG + ./../../../F_R_STYLE/F_S_MIN_FG) div 2" />}</xsl:for-each>],'sparge' : { 'type' : <xsl:value-of select="F_R_MASH/F_MH_BATCH" />, 'percentage' : <xsl:value-of select="F_R_MASH/F_MH_BATCH_PCT" />, 'even': <xsl:value-of select="F_R_MASH/F_MH_BATCH_EVEN" />, 'drain' : <xsl:value-of select="F_R_MASH/F_MH_BATCH_DRAIN" />, 'grain_weight' : <xsl:value-of select="format-number( round(F_R_MASH/F_MH_GRAIN_WEIGHT*0.062500*10) div 10, '##0.0' )" />, 'mash_water' : 0 <xsl:for-each select="./F_R_MASH/steps/Data/MashStep">+ <xsl:value-of select="format-number( round(F_MS_INFUSION*0.0078125*100) div 100, '##.00')" /></xsl:for-each>, 'pre_boil_water' : <xsl:value-of select="format-number( round(F_R_EQUIPMENT/F_E_BOIL_VOL*0.0078125*100) div 100, '##.00')" />, 'mash_tun_vol' : <xsl:value-of select="format-number( round(F_R_EQUIPMENT/F_E_MASH_VOL*0.0078125*100) div 100, '##.00')" />  } } !@#
				</div>
                <ul>
                    <li>
						Size:
						<span data-unit="imperial"><xsl:value-of select="round(F_R_EQUIPMENT/F_E_BATCH_VOL*0.0078125*100) div 100" /> gal</span>
						<span data-unit="metric"><xsl:value-of select="round(F_R_EQUIPMENT/F_E_BATCH_VOL*0.0295735*100) div 100" /> L</span>
					</li>
                    <li>Efficiency: <xsl:value-of select="round(F_R_EQUIPMENT/F_E_EFFICIENCY*100) div 100" />%</li>
                    <li>
                        OG: $$OG$$
                        (<xsl:value-of select="format-number( round(F_R_STYLE/F_S_MIN_OG*1000) div 1000, '##0.000' )" /> - <xsl:value-of select="format-number( round(F_R_STYLE/F_S_MAX_OG*1000) div 1000, '##0.000' )" />)
                    </li>
                    <li>
                        FG: $$FG$$
                        (<xsl:value-of select="format-number( round(F_R_STYLE/F_S_MIN_FG*1000) div 1000, '##0.000' )" /> - <xsl:value-of select="format-number( round(F_R_STYLE/F_S_MAX_FG*1000) div 1000, '##0.000' )" />)
                    </li>
                    <li>
                        Color: $$color$$
                        (<xsl:value-of select="round(F_R_STYLE/F_S_MIN_COLOR*100) div 100" /> - <xsl:value-of select="round(F_R_STYLE/F_S_MAX_COLOR*100) div 100" />)
                    </li>
                    <li>
                        Alcohol: $$ABV$$ 
                        (<xsl:value-of select="round(F_R_STYLE/F_S_MIN_ABV*100) div 100" /> - <xsl:value-of select="round(F_R_STYLE/F_S_MAX_ABV*100) div 100" />)
                    </li>
                    <li>
                        Bitterness: <xsl:value-of select="round(sum(./Ingredients/Data/Hops/F_H_IBU_CONTRIB)*10) div 10" /> IBU
                        (<xsl:value-of select="round(F_R_STYLE/F_S_MIN_IBU*10) div 10" /> - <xsl:value-of select="round(F_R_STYLE/F_S_MAX_IBU*10) div 10" />)
                    </li>
                    <li>Last modified: <xsl:value-of select="_MOD_" /></li>
                </ul>
                <xsl:apply-templates select="./Ingredients" />
                <xsl:apply-templates select="./F_R_MASH" />
				<xsl:apply-templates select="./F_R_NOTES" />
                <xsl:apply-templates select="./F_R_STYLE" />
            </div>
            <hr />
        </xsl:for-each>
    </xsl:template>
	
    <xsl:template match="F_R_MASH">
        <h3>Steps</h3>
        <table id="steps" class="table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Description</th>
                    <th>Step Temperature</th>
                    <th>Step Time</th>
                </tr>
            </thead>
            <tbody>
                <xsl:apply-templates select="./steps/Data/*" />
            </tbody>
        </table>

        <xsl:choose>
			<xsl:when test="F_MH_BATCH = 1">
				<p>
					Batch sparge with $$batch-steps-no$$ steps ($$batch-steps-vols$$) of 
					<span data-unit="imperial"><xsl:value-of select="format-number( round(F_MH_SPARGE_TEMP*10) div 10, '##.0')" /> F</span> 
					<span data-unit="metric"><xsl:value-of select="format-number( round(((F_MH_SPARGE_TEMP - 32) * 5 div 9)*10) div 10, '##.0')" /> C</span>
					water.
					Boil for <xsl:value-of select="round(../F_R_EQUIPMENT/F_E_BOIL_TIME*100) div 100" /> min.
				</p>
			</xsl:when>
			<xsl:otherwise>
				
				<p>
					Sparge until you hit a pre boil volume of 
					<span data-unit="imperial"><xsl:value-of select="format-number( round(../F_R_EQUIPMENT/F_E_BOIL_VOL*0.0078125*100) div 100, '##.00')" /> gal.</span>
					<span data-unit="metric"><xsl:value-of select="format-number( round(../F_R_EQUIPMENT/F_E_BOIL_VOL*0.0295735*100) div 100, '##.00')" /> L.</span>
					Boil for <xsl:value-of select="round(../F_R_EQUIPMENT/F_E_BOIL_TIME*100) div 100" /> min.
				</p>
			</xsl:otherwise>
		</xsl:choose>
    </xsl:template>
	
	<xsl:template match="F_R_NOTES">
		<xsl:if test=". != ''">
			<h3>Notes</h3>
			<p class="recipe-notes note">
				<xsl:value-of select="." />
			</p>
		</xsl:if>
    </xsl:template>

    <xsl:template match="F_R_STYLE">
        <h3>Style</h3>
        <div class="bjcp-style">
			<div class="bjcp-style-title">
				<strong><xsl:value-of select="F_S_NAME" /> (<xsl:value-of select="F_S_GUIDE" />&#160;&#160;<xsl:value-of select="F_S_NUMBER" /><xsl:value-of select="substring('ABCDEFGHIJKLMNOPQRSTUVWXYZ',number(F_S_LETTER),1)" />)</strong>
			</div>
			<p class="bjcp-style-notes note"><xsl:value-of select="F_S_PROFILE" /></p>
		</div>        
    </xsl:template>
	
    <xsl:template match="MashStep">
        <tr>
            <td><xsl:value-of select="F_MS_NAME" /></td>
            <td>
                <xsl:choose>
                  <xsl:when test="F_MS_TYPE = 0">
                    Infusion
                  </xsl:when>
                  <xsl:when test="F_MS_TYPE = 1">
                    Decoction
                  </xsl:when>
                  <xsl:when test="F_MS_TYPE = 2">
                    Temperature
                  </xsl:when>
                  <xsl:otherwise></xsl:otherwise>
                </xsl:choose>
            </td>
            <td>
                <xsl:choose>
                    <xsl:when test="F_MS_TYPE = 0">
                        <xsl:choose>
                            <xsl:when test="F_MS_INFUSION != 0">
                                Add 
								<span data-unit="imperial"><xsl:value-of select="format-number( round(F_MS_INFUSION*0.0078125*100) div 100, '##.00')" /> gal</span>
								<span data-unit="metric"><xsl:value-of select="format-number( round(F_MS_INFUSION*0.0295735*100) div 100, '##.00')" /> L</span>
                            </xsl:when>
                            <xsl:otherwise>
                                Heat
                            </xsl:otherwise>
                        </xsl:choose>
                         to 
						 <span data-unit="imperial"><xsl:value-of select="format-number( round(F_MS_INFUSION_TEMP*10) div 10, '##.0')" /> F</span>
						 <span data-unit="metric"><xsl:value-of select="format-number( round(((F_MS_INFUSION_TEMP - 32) * 5 div 9)*10) div 10, '##.0')" /> C</span>
                    </xsl:when>
                    <xsl:when test="F_MS_TYPE = 1">-</xsl:when>
                    <xsl:when test="F_MS_TYPE = 2">
                        <xsl:choose>
                            <xsl:when test="F_MS_INFUSION != 0">
                                Add 
								<span data-unit="imperial"><xsl:value-of select="format-number( round(F_MS_INFUSION*0.0078125*100) div 100, '##.00')" /> gal</span>
								<span data-unit="metric"><xsl:value-of select="format-number( round(F_MS_INFUSION*0.0295735*100) div 100, '##.00')" /> L</span>
                            </xsl:when>
                            <xsl:otherwise>
                                Heat
                            </xsl:otherwise>
                        </xsl:choose>
                         to 
						 <span data-unit="imperial"><xsl:value-of select="format-number( round(F_MS_INFUSION_TEMP*10) div 10, '##.0')" /> F</span>
						 <span data-unit="metric"><xsl:value-of select="format-number( round(((F_MS_INFUSION_TEMP - 32) * 5 div 9)*10) div 10, '##.0')" /> C</span>
                    </xsl:when>
                    <xsl:otherwise>

                    </xsl:otherwise>
                </xsl:choose>
            </td>
            <td>
				<span data-unit="imperial"><xsl:value-of select="format-number( round(F_MS_STEP_TEMP*10) div 10, '##.0')" /> F</span>
				<span data-unit="metric"><xsl:value-of select="format-number( round(((F_MS_STEP_TEMP - 32) * 5 div 9)*10) div 10, '##.0')" /> C</span>
			</td>
            <td><xsl:value-of select="round(F_MS_STEP_TIME*100) div 100" /> min</td>
            
        </tr>
    </xsl:template>
	
    <xsl:template match="Ingredients">
        <h3>Ingredients</h3>
        <p class="ingredients">
            <table id="ingredients" class="table">
                <thead>
                    <tr>
                        <th></th>
                        <th>Amt</th>
                        <th>Name</th>
                        <th>Type</th>
                        <th>%/IBU</th>
                    </tr>
                </thead>
                <tbody>
                    <xsl:apply-templates select="./Data/*">
                        <xsl:sort select="F_ORDER" data-type="number" />
                    </xsl:apply-templates>
                </tbody>
            </table>
        </p>
    </xsl:template>
	
    <xsl:template match="Grain">
        <tr class="grain">
            <td><xsl:value-of select="F_ORDER" /></td>
            <td>
				<span data-unit="imperial"><xsl:value-of select="format-number( round(F_G_AMOUNT*0.062500*10) div 10, '##0.0' )" /> lb</span>
				<span data-unit="metric"><xsl:value-of select="format-number( round(F_G_AMOUNT*0.0283495*100) div 100, '##0.00' )" /> kg</span>
			</td>
            <td><xsl:value-of select="F_G_NAME" /> (<xsl:value-of select="round(F_G_COLOR)" /> SRM)</td>
            <td>Grain</td>
            <td><xsl:value-of select="format-number( round(F_G_PERCENT*10) div 10, '##0.0')" />%</td>
        </tr>
    </xsl:template>
    <xsl:template match="Hops">
        <tr class="hop">
            <td><xsl:value-of select="F_ORDER" /></td>
            <td>
				<span data-unit="imperial"><xsl:value-of select="format-number(round(F_H_AMOUNT*10) div 10, '##0.0')" /> oz</span>
				<span data-unit="metric"><xsl:value-of select="format-number(round(F_H_AMOUNT*28.3495*10) div 10, '##0.0')" /> g</span>
			</td>
            <td>
                <xsl:value-of select="F_H_NAME" /> [<xsl:value-of select="format-number( round(F_H_ALPHA*10) div 10, '##0.0' )" /> %] -
                <xsl:choose>
                  <xsl:when test="F_H_USE = 0">
                    Boil <xsl:value-of select="round(F_H_BOIL_TIME*100) div 100" /> min
                  </xsl:when>
                  <xsl:when test="F_H_USE = 1">
                    Dry hop <xsl:value-of select="round(F_H_DRY_HOP_TIME*100) div 100" /> days
                  </xsl:when>
                  <xsl:when test="F_H_USE = 2">
                    Mash
                  </xsl:when>
                  <xsl:when test="F_H_USE = 3">
                    First Wort <xsl:value-of select="round(F_H_BOIL_TIME*100) div 100" /> min
                  </xsl:when>
				  <xsl:when test="F_H_USE = 4">
                    Steep/Whirlpool <xsl:value-of select="round(F_H_BOIL_TIME*100) div 100" /> min
                  </xsl:when>
                  <xsl:otherwise>
                    
                  </xsl:otherwise>
                </xsl:choose>
            </td>
            <td>Hop</td>
            <td><xsl:value-of select="format-number( round(F_H_IBU_CONTRIB*10) div 10, '###0.0')" /> IBU</td>
        </tr>
    </xsl:template>
    <xsl:template match="Yeast">
        <tr class="yeast">
            <td><xsl:value-of select="F_ORDER" /></td>
            <td><xsl:value-of select="format-number( round(F_Y_AMOUNT*10) div 10, '##0.0' )" /> Items</td>
            <td><xsl:value-of select="F_Y_LAB" />&#160;<xsl:value-of select="F_Y_NAME" />&#160;(<xsl:value-of select="F_Y_PRODUCT_ID" />) </td>
            <td>Yeast</td>
            <td>-</td>
        </tr>
    </xsl:template>
    <xsl:template match="Misc">
        <tr class="misc">
            <td><xsl:value-of select="F_ORDER" /></td>
            <td>
				<xsl:choose>
					<xsl:when test="F_M_UNITS = 0">
						<span data-unit="imperial"><xsl:value-of select="format-number(round(F_H_AMOUNT*0.000035274*10000) div 10000, '##0.0000')" /> oz</span>
						<span data-unit="metric"><xsl:value-of select="format-number(round(F_M_AMOUNT*100) div 100, '##0.00')" />  mg</span>
					</xsl:when>
					<xsl:when test="F_M_UNITS = 1">
						<span data-unit="imperial"><xsl:value-of select="format-number(round(F_H_AMOUNT*0.035274*100) div 100, '##0.00')" /> oz</span>
						<span data-unit="metric"><xsl:value-of select="format-number(round(F_M_AMOUNT*100) div 100, '##0.00')" />  g</span>
					</xsl:when>
					<xsl:when test="F_M_UNITS = 2">
						<span data-unit="imperial"><xsl:value-of select="format-number(round(F_M_AMOUNT*100) div 100, '##0.00')" />  oz</span>
						<span data-unit="metric"><xsl:value-of select="format-number(round(F_M_AMOUNT*28.3495*10) div 10, '##0.0')" />  g</span>
					</xsl:when>
					<xsl:when test="F_M_UNITS = 3">
						<span data-unit="imperial"><xsl:value-of select="format-number(round(F_M_AMOUNT*100) div 100, '##0.00')" />  lb</span>
						<span data-unit="metric"><xsl:value-of select="format-number(round(F_M_AMOUNT*0.453592*100) div 100, '##0.00')" />  kg</span>
					</xsl:when>
					<xsl:when test="F_M_UNITS = 4">
						<span data-unit="imperial"><xsl:value-of select="format-number(round(F_M_AMOUNT*2.20462*100) div 100, '##0.00')" />  lb</span>
						<span data-unit="metric"><xsl:value-of select="format-number(round(F_M_AMOUNT*100) div 100, '##0.00')" />  kg</span>
					</xsl:when>
					<xsl:when test="F_M_UNITS = 5">
						<span data-unit="imperial"><xsl:value-of select="format-number(round(F_M_AMOUNT*0.033814*1000) div 1000, '##0.000')" />  oz</span>
						<span data-unit="metric"><xsl:value-of select="format-number(round(F_M_AMOUNT*100) div 100, '##0.00')" />  ml</span>
					</xsl:when>
					<xsl:when test="F_M_UNITS = 6"><xsl:value-of select="format-number(round(F_M_AMOUNT*100) div 100, '##0.00')" />  tsp</xsl:when>
					<xsl:when test="F_M_UNITS = 7"><xsl:value-of select="format-number(round(F_M_AMOUNT*100) div 100, '##0.00')" />  tbsp</xsl:when>
					<xsl:when test="F_M_UNITS = 8"><xsl:value-of select="format-number(round(F_M_AMOUNT*100) div 100, '##0.00')" />  Cup</xsl:when>
					<xsl:when test="F_M_UNITS = 9">
						<span data-unit="imperial"><xsl:value-of select="format-number(round(F_M_AMOUNT*100) div 100, '##0.00')" />  pt</span>
						<span data-unit="metric"><xsl:value-of select="round(F_M_AMOUNT*473.18)" />  ml</span>
					</xsl:when>
					<xsl:when test="F_M_UNITS = 10">
						<span data-unit="imperial"><xsl:value-of select="format-number(round(F_M_AMOUNT*100) div 100, '##0.00')" />  qt</span>
						<span data-unit="metric"><xsl:value-of select="format-number(round(F_M_AMOUNT*0.946353*100) div 100, '##0.00')" />  l</span>
					</xsl:when>
					<xsl:when test="F_M_UNITS = 11">
						<span data-unit="imperial"><xsl:value-of select="format-number(round(F_M_AMOUNT*1.05669*100) div 100, '##0.00')" />  qt</span>
						<span data-unit="metric"><xsl:value-of select="format-number(round(F_M_AMOUNT*100) div 100, '##0.00')" />  l</span>
					</xsl:when>
					<xsl:when test="F_M_UNITS = 12">
						<span data-unit="imperial"><xsl:value-of select="format-number(round(F_M_AMOUNT*100) div 100, '##0.00')" />  gal</span>
						<span data-unit="metric"><xsl:value-of select="format-number(round(F_M_AMOUNT*3.78541*100) div 100, '##0.00')" />  l</span>
					</xsl:when>
					<xsl:when test="F_M_UNITS = 14"><xsl:value-of select="format-number(round(F_M_AMOUNT*100) div 100, '##0.0')" />  Items</xsl:when>
					<xsl:otherwise><xsl:value-of select="format-number(round(F_M_AMOUNT*100) div 100, '##0.00')" /> Items</xsl:otherwise>
				</xsl:choose>
			</td>
            <td>
                <xsl:value-of select="F_M_NAME" /> - 
                <xsl:choose>
                  <xsl:when test="F_M_USE = 0">
                    Boil <xsl:value-of select="round(F_M_TIME*100) div 100" /> 
                    <xsl:choose>
                        <xsl:when test="F_M_TIME_UNITS = 0"> mins</xsl:when>
                        <xsl:when test="F_M_TIME_UNITS = 1"> hours</xsl:when>
                        <xsl:when test="F_M_TIME_UNITS = 2"> days</xsl:when>
                        <xsl:when test="F_M_TIME_UNITS = 3"> weeks</xsl:when>
                        <xsl:otherwise></xsl:otherwise>
                    </xsl:choose>
                  </xsl:when>
                  <xsl:when test="F_M_USE = 1">
                    Mash <xsl:value-of select="round(F_M_TIME*100) div 100" />
                    <xsl:choose>
                        <xsl:when test="F_M_TIME_UNITS = 0"> mins</xsl:when>
                        <xsl:when test="F_M_TIME_UNITS = 1"> hours</xsl:when>
                        <xsl:when test="F_M_TIME_UNITS = 2"> days</xsl:when>
                        <xsl:when test="F_M_TIME_UNITS = 3"> weeks</xsl:when>
                        <xsl:otherwise></xsl:otherwise>
                    </xsl:choose>
                  </xsl:when>
                  <xsl:when test="F_M_USE = 2">
                    Primary <xsl:value-of select="round(F_M_TIME*100) div 100" />
                    <xsl:choose>
                        <xsl:when test="F_M_TIME_UNITS = 0"> mins</xsl:when>
                        <xsl:when test="F_M_TIME_UNITS = 1"> hours</xsl:when>
                        <xsl:when test="F_M_TIME_UNITS = 2"> days</xsl:when>
                        <xsl:when test="F_M_TIME_UNITS = 3"> weeks</xsl:when>
                        <xsl:otherwise></xsl:otherwise>
                    </xsl:choose>
                  </xsl:when>
                  <xsl:when test="F_M_USE = 3">
                    Secondary <xsl:value-of select="round(F_M_TIME*100) div 100" />
                    <xsl:choose>
                        <xsl:when test="F_M_TIME_UNITS = 0"> mins</xsl:when>
                        <xsl:when test="F_M_TIME_UNITS = 1"> hours</xsl:when>
                        <xsl:when test="F_M_TIME_UNITS = 2"> days</xsl:when>
                        <xsl:when test="F_M_TIME_UNITS = 3"> weeks</xsl:when>
                        <xsl:otherwise></xsl:otherwise>
                    </xsl:choose>
                  </xsl:when>
                  <xsl:when test="F_M_USE = 4">
                    Bottling <xsl:value-of select="round(F_M_TIME*100) div 100" />
                    <xsl:choose>
                        <xsl:when test="F_M_TIME_UNITS = 0"> mins</xsl:when>
                        <xsl:when test="F_M_TIME_UNITS = 1"> hours</xsl:when>
                        <xsl:when test="F_M_TIME_UNITS = 2"> days</xsl:when>
                        <xsl:when test="F_M_TIME_UNITS = 3"> weeks</xsl:when>
                        <xsl:otherwise></xsl:otherwise>
                    </xsl:choose>
                  </xsl:when>
                  <xsl:otherwise></xsl:otherwise>
                </xsl:choose>
            </td>
            <td>
                <xsl:choose>
                  <xsl:when test="F_M_TYPE = 0">Spice</xsl:when>
                  <xsl:when test="F_M_TYPE = 1">Fining</xsl:when>
                  <xsl:when test="F_M_TYPE = 2">Herb</xsl:when>
                  <xsl:when test="F_M_TYPE = 3">Flavor</xsl:when>
                  <xsl:when test="F_M_TYPE = 4">Other</xsl:when>
                  <xsl:when test="F_M_TYPE = 5">Water Agent</xsl:when>
                  <xsl:otherwise></xsl:otherwise>
                </xsl:choose>
            </td>
            <td>-</td>
       </tr>
    </xsl:template>



    
</xsl:stylesheet> 
