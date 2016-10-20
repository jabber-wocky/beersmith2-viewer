<?xml version="1.0" encoding="iso-8859-1"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:param name="path" />

    <xsl:template match="Data">
        <ul>
            <xsl:apply-templates select="./Recipe">
                <xsl:sort select="F_R_NAME" data-type="text" order="ascending" />
            </xsl:apply-templates>
        </ul>

        <xsl:apply-templates select="./Table">
            <xsl:sort select="Name" data-type="text" order="ascending" />
        </xsl:apply-templates>
    </xsl:template>

    <xsl:template match="Table">
        <h3><xsl:value-of select="Name"/></h3>
        <ul>
            <xsl:apply-templates select="./Data/Recipe">
                <xsl:sort select="F_R_NAME" />
            </xsl:apply-templates>
        </ul>
    </xsl:template>

    <xsl:template match="Recipe">
        <xsl:if test="boolean(F_R_NAME)">
            <li>
                <a>
                    <xsl:attribute name="href">
                        <xsl:value-of select="$path" />#folder=<xsl:value-of select="../../Name" />recipe=<xsl:call-template name="replace-string">
					  <xsl:with-param name="text" select="F_R_NAME"/>
					  <xsl:with-param name="replace" select="'%'" />
					  <xsl:with-param name="with" select="'%25'"/>
					</xsl:call-template>
                    </xsl:attribute>
                    
                    <xsl:value-of select="F_R_NAME" />
					
					

                </a>
            </li>
        </xsl:if>

        <xsl:apply-templates select="./Data">
            
        </xsl:apply-templates>
    </xsl:template>
	
	<xsl:template name="replace-string">
		<xsl:param name="text"/>
		<xsl:param name="replace"/>
		<xsl:param name="with"/>
		<xsl:choose>
		  <xsl:when test="contains($text,$replace)">
			<xsl:value-of select="substring-before($text,$replace)"/>
			<xsl:value-of select="$with"/>
			<xsl:call-template name="replace-string">
			  <xsl:with-param name="text" select="substring-after($text,$replace)"/>
			  <xsl:with-param name="replace" select="$replace"/>
			  <xsl:with-param name="with" select="$with"/>
			</xsl:call-template>
		  </xsl:when>
		  <xsl:otherwise>
			<xsl:value-of select="$text"/>
		  </xsl:otherwise>
		</xsl:choose>
  </xsl:template>
</xsl:stylesheet>